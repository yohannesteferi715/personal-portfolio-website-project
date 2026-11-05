/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import { api } from "../api";
import {
  PageHeader, Card, Field, Input, Textarea,
  Alert, Btn, BtnAdd, BtnEdit, BtnDelete, Modal, ConfirmDelete, Spinner, Empty,
} from "../components/ui";

const emptyForm = { quote: "", author: "", role: "", avatar_url: "", order: 0 };

const TestimonialForm = ({ initial, onSave, onClose, saving, alert }) => {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
      {alert && <Alert {...alert} />}

      <Field label="Quote" required>
        <Textarea rows={4} value={form.quote} onChange={(e) => set("quote", e.target.value)} placeholder="What did they say?" required />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Author Name" required>
          <Input value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Jane Smith" required />
        </Field>
        <Field label="Role / Company">
          <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="CEO, Acme Corp" />
        </Field>
        <Field label="Avatar URL">
          <Input value={form.avatar_url} onChange={(e) => set("avatar_url", e.target.value)} placeholder="https://..." />
        </Field>
        <Field label="Order">
          <Input type="number" value={form.order} onChange={(e) => set("order", +e.target.value)} />
        </Field>
      </div>

      {form.avatar_url && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50">
          <img src={form.avatar_url} alt="Preview" className="w-10 h-10 rounded-full object-cover" onError={(e) => e.target.style.display = "none"} />
          <span className="text-xs text-muted-foreground">Avatar preview</span>
        </div>
      )}

      <div className="flex gap-3 justify-end pt-2">
        <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
        <Btn type="submit" loading={saving}>Save</Btn>
      </div>
    </form>
  );
};

export const TestimonialsPage = () => {
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
      const data = await api.getTestimonials();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => { setFormAlert(null); setModal({ mode: "create", item: { ...emptyForm } }); };
  const openEdit = (item) => { setFormAlert(null); setModal({ mode: "edit", item: { ...item } }); };

  const handleSave = async (data) => {
    setSaving(true);
    setFormAlert(null);
    try {
      if (modal.mode === "create") await api.createTestimonial(data);
      else await api.updateTestimonial(modal.item.id, data);
      setModal(null);
      setAlert({ type: "success", message: `Testimonial ${modal.mode === "create" ? "created" : "updated"}.` });
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
      await api.deleteTestimonial(deleteTarget.id);
      setDeleteTarget(null);
      setAlert({ type: "success", message: "Testimonial deleted." });
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
        title="Testimonials"
        description="Manage client quotes and reviews."
        action={<BtnAdd onClick={openCreate}>Add Testimonial</BtnAdd>}
      />

      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}

      {loading ? <Spinner /> : items.length === 0 ? <Empty message="No testimonials yet." /> : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex items-start gap-4">
              <img
                src={item.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.author)}
                alt={item.author}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-border"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{item.author}</span>
                  <span className="text-xs text-muted-foreground">{item.role}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 italic">"{item.quote}"</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <BtnEdit onClick={() => openEdit(item)} />
                <BtnDelete onClick={() => setDeleteTarget(item)} />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "Add Testimonial" : "Edit Testimonial"}>
        {modal && (
          <TestimonialForm initial={modal.item} onSave={handleSave} onClose={() => setModal(null)} saving={saving} alert={formAlert} />
        )}
      </Modal>

      <ConfirmDelete
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        label={deleteTarget?.author}
      />
    </div>
  );
};
