/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useRef, useCallback } from "react";
import { api } from "../api";
import {
  PageHeader, Card, Field, Input, Textarea, Toggle,
  Alert, Btn, BtnAdd, BtnEdit, BtnDelete, Modal, ConfirmDelete, Spinner, Empty,
} from "../components/ui";
import { ImagePlus } from "lucide-react";

const emptyForm = { title: "", description: "", tags: "", live_url: "", github_url: "", featured: true, order: 0 };

const ProjectForm = ({ initial, onSave, onClose, saving, alert }) => {
  const [form, setForm] = useState(initial);
  const [previewUrl, setPreviewUrl] = useState(initial?.image_url || "");
  const fileRef = useRef(null);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      set("_file", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("tags", form.tags);
    fd.append("live_url", form.live_url || "");
    fd.append("github_url", form.github_url || "");
    fd.append("featured", String(form.featured));
    fd.append("order", String(form.order));
    if (form._file) fd.append("image", form._file);
    onSave(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {alert && <Alert {...alert} />}

      {/* Image upload */}
      <div
        className="relative w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer overflow-hidden bg-surface/50"
        onClick={() => fileRef.current?.click()}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImagePlus className="w-8 h-8" />
            <span className="text-sm">Click to upload image</span>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" required>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Project name" required />
        </Field>
        <Field label="Order">
          <Input type="number" value={form.order} onChange={(e) => set("order", +e.target.value)} />
        </Field>
      </div>

      <Field label="Description" required>
        <Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What does this project do?" required />
      </Field>

      <Field label="Tags (comma-separated)">
        <Input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="React, TypeScript, Node.js" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Live URL">
          <Input value={form.live_url} onChange={(e) => set("live_url", e.target.value)} placeholder="https://..." />
        </Field>
        <Field label="GitHub URL">
          <Input value={form.github_url} onChange={(e) => set("github_url", e.target.value)} placeholder="https://github.com/..." />
        </Field>
      </div>

      <Toggle label="Featured on homepage" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} />

      <div className="flex gap-3 justify-end pt-2">
        <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
        <Btn type="submit" loading={saving}>Save Project</Btn>
      </div>
    </form>
  );
};

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | { mode: 'create'|'edit', item }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formAlert, setFormAlert] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data);
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
    setModal({
      mode: "edit",
      item: { ...item, tags: (item.tags || []).join(", "), _file: null },
    });
  };

  const handleSave = async (fd) => {
    setSaving(true);
    setFormAlert(null);
    try {
      if (modal.mode === "create") await api.createProject(fd);
      else await api.updateProject(modal.item.id, fd);
      setModal(null);
      setAlert({ type: "success", message: `Project ${modal.mode === "create" ? "created" : "updated"}.` });
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
      await api.deleteProject(deleteTarget.id);
      setDeleteTarget(null);
      setAlert({ type: "success", message: "Project deleted." });
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
        title="Projects"
        description="Manage your portfolio projects."
        action={<BtnAdd onClick={openCreate}>Add Project</BtnAdd>}
      />

      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}

      {loading ? <Spinner /> : projects.length === 0 ? <Empty message="No projects yet. Add your first one!" /> : (
        <div className="space-y-3">
          {projects.map((p) => (
            <Card key={p.id} className="flex items-center gap-4">
              <div className="w-20 h-14 rounded-xl overflow-hidden bg-surface flex-shrink-0">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No img</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{p.title}</h3>
                  {p.featured && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">Featured</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {p.tags?.slice(0, 4).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-surface border border-border/50 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <BtnEdit onClick={() => openEdit(p)} />
                <BtnDelete onClick={() => setDeleteTarget(p)} />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.mode === "create" ? "Add Project" : "Edit Project"}
      >
        {modal && (
          <ProjectForm
            initial={modal.item}
            onSave={handleSave}
            onClose={() => setModal(null)}
            saving={saving}
            alert={formAlert}
          />
        )}
      </Modal>

      <ConfirmDelete
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        label={deleteTarget?.title}
      />
    </div>
  );
};
