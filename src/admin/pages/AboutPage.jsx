import { useEffect, useState } from "react";
import { api } from "../api";
import { PageHeader, Card, Field, Input, Textarea, Alert, Btn, Spinner } from "../components/ui";
import { Plus, Trash2 } from "lucide-react";

const ICON_OPTIONS = ["Code2", "Rocket", "Users", "Lightbulb", "Star", "Heart", "Globe", "Zap"];

const defaultHighlight = { icon: "Code2", title: "", description: "" };

export const AboutPage = () => {
  const [form, setForm] = useState({ paragraphs: [], mission_quote: "", highlights: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    api.getAbout()
      .then(setForm)
      .catch(() => setAlert({ type: "error", message: "Failed to load about data." }))
      .finally(() => setLoading(false));
  }, []);

  // ── Paragraphs ──────────────────────────────────────────────────────────────
  const setParagraph = (idx, value) => {
    const p = [...form.paragraphs];
    p[idx] = value;
    setForm((f) => ({ ...f, paragraphs: p }));
  };
  const addParagraph = () => setForm((f) => ({ ...f, paragraphs: [...f.paragraphs, ""] }));
  const removeParagraph = (idx) => setForm((f) => ({ ...f, paragraphs: f.paragraphs.filter((_, i) => i !== idx) }));

  // ── Highlights ──────────────────────────────────────────────────────────────
  const setHighlight = (idx, key, value) => {
    const h = [...form.highlights];
    h[idx] = { ...h[idx], [key]: value };
    setForm((f) => ({ ...f, highlights: h }));
  };
  const addHighlight = () => setForm((f) => ({ ...f, highlights: [...f.highlights, { ...defaultHighlight }] }));
  const removeHighlight = (idx) => setForm((f) => ({ ...f, highlights: f.highlights.filter((_, i) => i !== idx) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);
    try {
      await api.updateAbout(form);
      setAlert({ type: "success", message: "About section saved." });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <PageHeader title="About" description="Edit the About Me section." />
      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Mission quote */}
        <Card>
          <h3 className="font-semibold mb-4">Mission Quote</h3>
          <Field label="Quoted text (shown in a highlighted box)">
            <Textarea rows={3} value={form.mission_quote} onChange={(e) => setForm((f) => ({ ...f, mission_quote: e.target.value }))} placeholder="My mission is…" />
          </Field>
        </Card>

        {/* Paragraphs */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Paragraphs</h3>
            <Btn variant="secondary" size="sm" type="button" onClick={addParagraph}>
              <Plus className="w-3.5 h-3.5" /> Add Paragraph
            </Btn>
          </div>
          <div className="space-y-3">
            {form.paragraphs.map((p, idx) => (
              <div key={idx} className="flex gap-3">
                <Textarea
                  className="flex-1"
                  rows={3}
                  value={p}
                  onChange={(e) => setParagraph(idx, e.target.value)}
                  placeholder={`Paragraph ${idx + 1}…`}
                />
                <button type="button" onClick={() => removeParagraph(idx)} className="self-start mt-2 text-muted-foreground hover:text-red-400 transition-colors p-1.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {form.paragraphs.length === 0 && <p className="text-sm text-muted-foreground">No paragraphs yet.</p>}
          </div>
        </Card>

        {/* Highlights */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Highlight Cards</h3>
            <Btn variant="secondary" size="sm" type="button" onClick={addHighlight}>
              <Plus className="w-3.5 h-3.5" /> Add Card
            </Btn>
          </div>
          <div className="space-y-4">
            {form.highlights.map((h, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border/50 bg-surface/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Card {idx + 1}</span>
                  <button type="button" onClick={() => removeHighlight(idx)} className="text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Icon">
                    <select
                      value={h.icon}
                      onChange={(e) => setHighlight(idx, "icon", e.target.value)}
                      className="w-full px-3 py-2.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                    >
                      {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </Field>
                  <Field label="Title">
                    <Input value={h.title} onChange={(e) => setHighlight(idx, "title", e.target.value)} placeholder="Clean Code" />
                  </Field>
                </div>
                <Field label="Description">
                  <Textarea rows={2} value={h.description} onChange={(e) => setHighlight(idx, "description", e.target.value)} placeholder="Short description…" />
                </Field>
              </div>
            ))}
            {form.highlights.length === 0 && <p className="text-sm text-muted-foreground">No highlights yet.</p>}
          </div>
        </Card>

        <div className="flex justify-end">
          <Btn type="submit" loading={saving} size="lg">
            {saving ? "Saving…" : "Save About"}
          </Btn>
        </div>
      </form>
    </div>
  );
};
