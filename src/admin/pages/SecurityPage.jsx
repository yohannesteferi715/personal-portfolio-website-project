import { useState } from "react";
import { api } from "../api";
import { PageHeader, Card, Field, Input, Btn, Alert } from "../components/ui";
import { ShieldCheck, Lock, Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react";

export const SecurityPage = () => {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!form.current_password) {
      setAlert({ type: "error", message: "Please enter your current password." });
      return;
    }

    if (form.new_password.length < 6) {
      setAlert({ type: "error", message: "New password must be at least 6 characters long." });
      return;
    }

    if (form.new_password !== form.confirm_password) {
      setAlert({ type: "error", message: "New password and confirmation do not match." });
      return;
    }

    setSaving(true);
    try {
      const res = await api.changePassword(
        form.current_password,
        form.new_password,
        form.confirm_password
      );
      setAlert({
        type: "success",
        message: res.message || "Password changed successfully! Your session is updated.",
      });
      setForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setAlert({ type: "error", message: err.message || "Failed to update password." });
    } finally {
      setSaving(false);
    }
  };

  const isMinLength = form.new_password.length >= 6;
  const isMatching = form.new_password && form.new_password === form.confirm_password;

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Security & Password"
        description="Manage your admin authentication credentials and session security."
      />

      {alert && <Alert type={alert.type} message={alert.message} />}

      {/* Admin Session Status */}
      <Card className="border border-primary/20 bg-primary/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">Admin Session Verified</h2>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-mono border border-green-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active JWT
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All mutating API endpoints (creating, updating, deleting content and uploading files)
              are strictly authenticated and guarded with cryptographic Bearer tokens.
            </p>
          </div>
        </div>
      </Card>

      {/* Password Change Form */}
      <Card className="border border-border/50">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
          <div className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-primary">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-foreground">Change Admin Password</h3>
            <p className="text-xs text-muted-foreground">
              Enter your current password followed by your new password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <Field label="Current Password" required>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={form.current_password}
                onChange={(e) => set("current_password", e.target.value)}
                placeholder="Enter current password…"
                className="pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>

          {/* New Password */}
          <Field label="New Password" required>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={form.new_password}
                onChange={(e) => set("new_password", e.target.value)}
                placeholder="Minimum 6 characters…"
                className="pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>

          {/* Confirm New Password */}
          <Field label="Confirm New Password" required>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={form.confirm_password}
                onChange={(e) => set("confirm_password", e.target.value)}
                placeholder="Re-type new password…"
                className="pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>

          {/* Password Strength Checklist */}
          {form.new_password && (
            <div className="p-3 rounded-xl bg-surface/60 border border-border/30 space-y-1.5 text-xs">
              <div className={`flex items-center gap-2 ${isMinLength ? "text-green-400" : "text-muted-foreground"}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${isMinLength ? "opacity-100" : "opacity-40"}`} />
                <span>At least 6 characters long ({form.new_password.length}/6)</span>
              </div>
              <div className={`flex items-center gap-2 ${isMatching ? "text-green-400" : "text-muted-foreground"}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${isMatching ? "opacity-100" : "opacity-40"}`} />
                <span>New passwords match</span>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <Btn type="submit" loading={saving} size="default" className="min-w-36 justify-center">
              <Lock className="w-4 h-4" />
              <span>Update Password</span>
            </Btn>
          </div>
        </form>
      </Card>
    </div>
  );
};
