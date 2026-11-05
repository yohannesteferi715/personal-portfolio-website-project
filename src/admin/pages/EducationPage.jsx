import { useEffect, useState } from "react";
import { api } from "../api";
import {
  PageHeader, Card, Field, Input, Textarea,
  Alert, Btn, BtnAdd, BtnEdit, BtnDelete, Modal, ConfirmDelete, Spinner, Empty,
} from "../components/ui";

const emptyForm = { institution: "", degree: "", field_of_study: "", start_date: "", end_date: "", description: "", coursework: "", order: 0 };

const EducationForm = ({ initial, onSave, onClose, saving, alert }) => {
  const [form, setForm] = useState({ ...initial, coursework: (initial.coursework || []).join(", ") });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave({
        ...form,
        coursework: (form.coursework || "").split(",").map((c) => c.trim()).filter(Boolean),
      });
    }} className="space-y-4">
      {alert && <Alert {...alert} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Institution" required>
          <Input value={form.institution} onChange={(e) => set("institution", e.target.value)} required />
        </Field>
        <Field label="Degree" required>
          <Input value={form.degree} onChange={(e) => set("degree", e.target.value)} required />
        </Field>
        <Field label="Field of Study">
          <Input value={form.field_of_study} onChange={(e) => set("field_of_study", e.target.value)} />
        </Field>
        <Field label="Order">
          <Input type="number" value={form.order} onChange={(e) => set("order", +e.target.value)} />
        </Field>
        <Field label="Start Date">
          <Input value={form.start_date} onChange={(e) => set("start_date", e.target.value)} placeholder="2019" />
        </Field>
        <Field label="End Date">
          <Input value={form.end_date} onChange={(e) => set("end_date", e.target.value)} placeholder="2023" />
        </Field>
      </div>
      <Field label="Description">
        <Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </Field>
      <Field label="Relevant Coursework (comma-separated)">
        <Input value={form.coursework} onChange={(e) => set("coursework", e.target.value)} placeholder="Data Structures, Algorithms" />
      </Field>
      <div className="flex gap-3 justify-end pt-2">
        <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
        <Btn type="submit" loading={saving}>Save</Btn>
      </div>
    </form>
  );
};

export const EducationPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formAlert, setFormAlert] = useState(null);

  const load = () => { setLoading(true); api.getEducation().then(setItems).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openCreate = () => { setFormAlert(null); setModal({ mode: "create", item: { ...emptyForm } }); };
  const openEdit = (item) => { setFormAlert(null); setModal({ mode: "edit", item: { ...item } }); };

  const handleSave = async (data) => {
    setSaving(true); setFormAlert(null);
    try {
      if (modal.mode === "create") await api.createEducation(data);
      else await api.updateEducation(modal.item.id, data);
      setModal(null);
      setAlert({ type: "success", message: "Education entry saved." });
      load();
    } catch (err) { setFormAlert({ type: "error", message: err.message }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.deleteEducation(deleteTarget.id);
      setDeleteTarget(null);
      setAlert({ type: "success", message: "Deleted." });
      load();
    } catch (err) { setAlert({ type: "error", message: err.message }); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <PageHeader title="Education" description="Manage education entries." action={<BtnAdd onClick={openCreate}>Add Education</BtnAdd>} />
      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}
      {loading ? <Spinner /> : items.length === 0 ? <Empty message="No education entries yet." /> : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-medium">{item.degree}</h3>
                <p className="text-sm text-muted-foreground">{item.institution} — {item.field_of_study}</p>
                <p className="text-xs text-primary mt-1">{item.start_date} — {item.end_date}</p>
              </div>
              <div className="flex gap-2"><BtnEdit onClick={() => openEdit(item)} /><BtnDelete onClick={() => setDeleteTarget(item)} /></div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "Add Education" : "Edit Education"}>
        {modal && <EducationForm initial={modal.item} onSave={handleSave} onClose={() => setModal(null)} saving={saving} alert={formAlert} />}
      </Modal>
      <ConfirmDelete open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} label={deleteTarget?.degree} />
    </div>
  );
};
