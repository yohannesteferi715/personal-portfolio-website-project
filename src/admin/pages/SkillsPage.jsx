/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from "react";
import { api } from "../api";
import {
  PageHeader, Card, Field, Input, Select,
  Alert, Btn, BtnAdd, Modal, ConfirmDelete, Spinner, Empty,
} from "../components/ui";

const CATEGORIES = ["frontend", "backend", "database", "devops", "testing", "design", "other"];
const CATEGORY_COLORS = {
  frontend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  backend: "bg-green-500/10 text-green-400 border-green-500/20",
  database: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  devops: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  testing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  other: "bg-surface text-muted-foreground border-border/50",
};

const SkillForm = ({ initial, onSave, onClose, saving, alert }) => {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
      {alert && <Alert {...alert} />}
      <Field label="Skill Name" required>
        <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="React" required autoFocus />
      </Field>
      <Field label="Category">
        <Select value={form.category || ""} onChange={(e) => set("category", e.target.value)}>
          <option value="">— No category —</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </Field>
      <div className="flex gap-3 justify-end pt-2">
        <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
        <Btn type="submit" loading={saving}>Save</Btn>
      </div>
    </form>
  );
};

export const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [formAlert, setFormAlert] = useState(null);
  const [filterCat, setFilterCat] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getSkills();
      setSkills(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => { setFormAlert(null); setModal({ mode: "create", item: { name: "", category: "frontend" } }); };
  const openEdit = (item) => { setFormAlert(null); setModal({ mode: "edit", item: { ...item } }); };

  const handleSave = async (data) => {
    setSaving(true);
    setFormAlert(null);
    try {
      if (modal.mode === "create") await api.createSkill(data);
      else await api.updateSkill(modal.item.id, data);
      setModal(null);
      setAlert({ type: "success", message: `Skill ${modal.mode === "create" ? "created" : "updated"}.` });
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
      await api.deleteSkill(deleteTarget.id);
      setDeleteTarget(null);
      setAlert({ type: "success", message: "Skill deleted." });
      load();
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setDeleting(false);
    }
  };

  const filtered = filterCat === "all" ? skills : skills.filter((s) => s.category === filterCat);
  const counts = CATEGORIES.reduce((acc, c) => { acc[c] = skills.filter((s) => s.category === c).length; return acc; }, {});

  return (
    <div>
      <PageHeader
        title="Skills"
        description={`${skills.length} total skills`}
        action={<BtnAdd onClick={openCreate}>Add Skill</BtnAdd>}
      />

      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCat("all")}
          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${filterCat === "all" ? "bg-primary/15 text-primary border-primary/30" : "bg-surface border-border/50 text-muted-foreground hover:border-primary/30"}`}
        >
          All ({skills.length})
        </button>
        {CATEGORIES.filter((c) => counts[c] > 0).map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${filterCat === c ? "bg-primary/15 text-primary border-primary/30" : `${CATEGORY_COLORS[c] || "bg-surface border-border/50 text-muted-foreground"} hover:border-primary/30`}`}
          >
            {c} ({counts[c]})
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : filtered.length === 0 ? <Empty message="No skills in this category." /> : (
        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            {filtered.map((skill) => (
              <div
                key={skill.id}
                className={`group flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full border text-sm ${CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.other}`}
              >
                <span>{skill.name}</span>
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(skill)}
                    className="p-0.5 rounded-full hover:bg-black/20 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(skill)}
                    className="p-0.5 rounded-full hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "Add Skill" : "Edit Skill"}>
        {modal && (
          <SkillForm initial={modal.item} onSave={handleSave} onClose={() => setModal(null)} saving={saving} alert={formAlert} />
        )}
      </Modal>

      <ConfirmDelete
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        label={deleteTarget?.name}
      />
    </div>
  );
};
