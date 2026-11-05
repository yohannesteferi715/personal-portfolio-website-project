import { useEffect, useState } from "react";
import { api } from "../api";
import {
  PageHeader, Card, Field, Input, Textarea, Toggle,
  Alert, Btn, BtnAdd, BtnEdit, BtnDelete, Modal, ConfirmDelete, Spinner, Empty,
} from "../components/ui";

const emptyForm = { title: "", slug: "", excerpt: "", content: "", tags: "", published: true, order: 0 };

const ArticleForm = ({ initial, onSave, onClose, saving, alert }) => {
  const [form, setForm] = useState({ ...initial, tags: (initial.tags || []).join(", ") });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave({
        ...form,
        tags: (form.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      });
    }} className="space-y-4">
      {alert && <Alert {...alert} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" required>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </Field>
        <Field label="Slug (leave empty to auto-generate)">
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto" />
        </Field>
      </div>
      <Field label="Excerpt">
        <Textarea rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
      </Field>
      <Field label="Content (Markdown)">
        <Textarea rows={8} value={form.content} onChange={(e) => set("content", e.target.value)} className="font-mono text-xs" />
      </Field>
      <Field label="Tags (comma-separated)">
        <Input value={form.tags} onChange={(e) => set("tags", e.target.value)} />
      </Field>
      <Toggle label="Published" checked={!!form.published} onChange={(e) => set("published", e.target.checked)} />
      <div className="flex gap-3 justify-end pt-2">
        <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
        <Btn type="submit" loading={saving}>Save</Btn>
      </div>
    </form>
  );
};

export const ArticlesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formAlert, setFormAlert] = useState(null);

  const load = () => { setLoading(true); api.getArticles().then(setItems).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openCreate = () => { setFormAlert(null); setModal({ mode: "create", item: { ...emptyForm } }); };
  const openEdit = (item) => { setFormAlert(null); setModal({ mode: "edit", item: { ...item } }); };

  const handleSave = async (data) => {
    setSaving(true); setFormAlert(null);
    try {
      if (modal.mode === "create") await api.createArticle(data);
      else await api.updateArticle(modal.item.id, data);
      setModal(null);
      setAlert({ type: "success", message: "Article saved." });
      load();
    } catch (err) { setFormAlert({ type: "error", message: err.message }); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.deleteArticle(deleteTarget.id);
      setDeleteTarget(null);
      setAlert({ type: "success", message: "Article deleted." });
      load();
    } catch (err) { setAlert({ type: "error", message: err.message }); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <PageHeader title="Articles" description="Manage technical blog posts." action={<BtnAdd onClick={openCreate}>Add Article</BtnAdd>} />
      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}
      {loading ? <Spinner /> : items.length === 0 ? <Empty message="No articles yet." /> : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.title}</h3>
                  {!item.published && <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">Draft</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.excerpt}</p>
                <div className="flex gap-1 mt-2">
                  {item.tags?.slice(0, 4).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-surface border border-border/50 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2"><BtnEdit onClick={() => openEdit(item)} /><BtnDelete onClick={() => setDeleteTarget(item)} /></div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "Add Article" : "Edit Article"}>
        {modal && <ArticleForm initial={modal.item} onSave={handleSave} onClose={() => setModal(null)} saving={saving} alert={formAlert} />}
      </Modal>
      <ConfirmDelete open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} label={deleteTarget?.title} />
    </div>
  );
};
