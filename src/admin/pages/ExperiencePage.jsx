/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import { api } from "../api";
import {
  PageHeader, Card, Field, Input, Textarea, Toggle,
  Alert, Btn, BtnAdd, BtnEdit, BtnDelete, Modal, ConfirmDelete, Spinner, Empty,
} from "../components/ui";
import { GripVertical } from "lucide-react";

const emptyForm = { period: "", role: "", company: "", description: "", technologies: "", current: false, order: 0 };

const ExperienceForm = ({ initial, onSave, onClose, saving, alert }) => {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      technologies: (form.technologies || "").split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {alert && <Alert {...alert} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Period" required>
          <Input value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="2022 — Present" required />
        </Field>
        <Field label="Order">
          <Input type="number" value={form.order} onChange={(e) => set("order", +e.target.value)} />
        </Field>
        <Field label="Role / Job Title" required>
          <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Senior Frontend Engineer" required />
        </Field>
        <Field label="Company" required>
          <Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Corp" required />
        </Field>
      </div>

      <Field label="Description" required>
        <Textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What did you accomplish here?" required />
      </Field>

      <Field label="Technologies (comma-separated)">
        <Input value={form.technologies} onChange={(e) => set("technologies", e.target.value)} placeholder="React, TypeScript, Node.js" />
      </Field>

      <Toggle label="Current position" checked={!!form.current} onChange={(e) => set("current", e.target.checked)} />

      <div className="flex gap-3 justify-end pt-2">
        <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
        <Btn type="submit" loading={saving}>Save</Btn>
      </div>
    </form>
  );
};

export const ExperiencePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formAlert, setFormAlert] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getExperiences();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => { setFormAlert(null); setModal({ mode: "create", item: { ...emptyForm } }); };
  const openEdit = (item) => {
    setFormAlert(null);
    setModal({ mode: "edit", item: { ...item, technologies: (item.technologies || []).join(", ") } });
  };

  const handleSave = async (data) => {
    setSaving(true);
    setFormAlert(null);
    try {
      if (modal.mode === "create") await api.createExperience(data);
      else await api.updateExperience(modal.item.id, data);
      setModal(null);
      setAlert({ type: "success", message: `Experience ${modal.mode === "create" ? "created" : "updated"}.` });
      load();
    } catch (err) {
      setFormAlert({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.deleteExperience(deleteTarget.id);
      setDeleteTarget(null);
      setAlert({ type: "success", message: "Experience entry deleted." });
      load();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Experience"
        description="Manage your work history timeline."
        action={<BtnAdd onClick={openCreate}>Add Experience</BtnAdd>}
      />

      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}

      {loading ? <Spinner /> : items.length === 0 ? <Empty message="No experience entries yet." /> : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex items-start gap-4">
              <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium">{item.role}</h3>
                  <span className="text-muted-foreground text-sm">@ {item.company}</span>
                  {item.current && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">Current</span>}
                </div>
                <p className="text-xs text-primary mt-0.5">{item.period}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.technologies?.slice(0, 5).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-surface border border-border/50 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <BtnEdit onClick={() => openEdit(item)} />
                <BtnDelete onClick={() => setDeleteTarget(item)} />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "Add Experience" : "Edit Experience"}>
        {modal && (
          <ExperienceForm initial={modal.item} onSave={handleSave} onClose={() => setModal(null)} saving={saving} alert={formAlert} />
        )}
      </Modal>

      <ConfirmDelete
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        label={deleteTarget ? `${deleteTarget.role} @ ${deleteTarget.company}` : ""}
      />
    </div>
  );
};
