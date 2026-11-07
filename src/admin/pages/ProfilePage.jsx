import { useEffect, useState } from "react";
import { api } from "../api";
import { PageHeader, Card, Field, Input, Textarea, Toggle, Alert, Btn, Spinner } from "../components/ui";
import { Plus, Trash2, Upload } from "lucide-react";

const PLATFORMS = ["github", "linkedin", "telegram", "x", "instagram", "youtube", "dribbble"];

export const ProfilePage = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    api.getProfile()
      .then(setForm)
      .catch(() => setAlert({ type: "error", message: "Failed to load profile." }))
      .finally(() => setLoading(false));
  }, []);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const setLink = (idx, key, value) => {
    const links = [...(form.social_links || [])];
    links[idx] = { ...links[idx], [key]: value };
    set("social_links", links);
  };

  const addLink = () => set("social_links", [...(form.social_links || []), { platform: "github", href: "" }]);

  const removeLink = (idx) => set("social_links", form.social_links.filter((_, i) => i !== idx));

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const res = await api.uploadProfilePhoto(file);
      set("profile_photo_url", res.profile_photo_url);
      setAlert({ type: "success", message: "Photo uploaded." });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);
    try {
      await api.updateProfile(form);
      setAlert({ type: "success", message: "Profile saved successfully." });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <PageHeader title="Profile" description="Edit your hero section content." />
      {alert && <div className="mb-6"><Alert {...alert} onClose={() => setAlert(null)} /></div>}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Photo */}
        <Card>
          <h3 className="font-semibold mb-4">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface border border-border flex-shrink-0">
              {form?.profile_photo_url ? (
                <img src={form.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No photo</div>
              )}
            </div>
            <div>
              <label className="cursor-pointer">
                <Btn as="span" variant="secondary" loading={photoUploading}>
                  <Upload className="w-4 h-4" />
                  {photoUploading ? "Uploading…" : "Upload Photo"}
                </Btn>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
              <p className="text-xs text-muted-foreground mt-2">JPEG, PNG or WebP. Shown in hero section.</p>
            </div>
          </div>
        </Card>

        {/* Basic info */}
        <Card>
          <h3 className="font-semibold mb-4">Basic Info</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" required>
              <Input value={form?.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="Yohannes Teferi" required />
            </Field>
            <Field label="Title / Badge">
              <Input value={form?.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Software Engineer • React Specialist" />
            </Field>
            <Field label="Years of Experience">
              <Input type="number" min="0" value={form?.years_experience || 0} onChange={(e) => set("years_experience", +e.target.value)} />
            </Field>
            <Field label="CV URL">
              <Input value={form?.cv_url || ""} onChange={(e) => set("cv_url", e.target.value)} placeholder="https://..." />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Bio">
              <Textarea rows={3} value={form?.bio || ""} onChange={(e) => set("bio", e.target.value)} placeholder="Short bio for hero section…" />
            </Field>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            <Field label="Email">
              <Input type="email" value={form?.email || ""} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="Phone">
              <Input value={form?.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder="+1 (555) 123-4567" />
            </Field>
            <Field label="Location">
              <Input value={form?.location || ""} onChange={(e) => set("location", e.target.value)} placeholder="Addis Ababa, ET" />
            </Field>
          </div>
          <div className="mt-4">
            <Toggle label="Available for work" checked={!!form?.available_for_work} onChange={(e) => set("available_for_work", e.target.checked)} />
          </div>
        </Card>

        {/* Headline */}
        <Card>
          <h3 className="font-semibold mb-4">Hero Headline</h3>
          <p className="text-xs text-muted-foreground mb-4">Renders as: <em>[prefix] [highlight] [suffix] [italic]</em></p>
          <div className="grid sm:grid-cols-2 gap-4">
            {["headline_prefix", "headline_highlight", "headline_suffix", "headline_italic"].map((k) => (
              <Field key={k} label={k.replace("headline_", "").replace("_", " ")}>
                <Input value={form?.[k] || ""} onChange={(e) => set(k, e.target.value)} />
              </Field>
            ))}
          </div>
        </Card>

        {/* Social links */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Social Links</h3>
            <Btn variant="secondary" size="sm" type="button" onClick={addLink}>
              <Plus className="w-3.5 h-3.5" /> Add Link
            </Btn>
          </div>
          <div className="space-y-3">
            {(form?.social_links || []).map((link, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <select
                  value={link.platform}
                  onChange={(e) => setLink(idx, "platform", e.target.value)}
                  className="px-3 py-2.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-all w-36"
                >
                  {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <Input
                  className="flex-1"
                  value={link.href}
                  onChange={(e) => setLink(idx, "href", e.target.value)}
                  placeholder="https://..."
                />
                <button type="button" onClick={() => removeLink(idx)} className="text-muted-foreground hover:text-red-400 transition-colors p-1.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {(form?.social_links || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No social links yet.</p>
            )}
          </div>
        </Card>

        <div className="flex justify-end">
          <Btn type="submit" loading={saving} size="lg">
            {saving ? "Saving…" : "Save Profile"}
          </Btn>
        </div>
      </form>
    </div>
  );
};
