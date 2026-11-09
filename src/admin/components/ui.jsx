/**
 * Shared micro-components for the admin UI.
 */
import { Loader2, AlertCircle, CheckCircle, X, Plus, Pencil, Trash2 } from "lucide-react";

// ── Page header ───────────────────────────────────────────────────────────────
export const PageHeader = ({ title, description, action }) => (
  <div className="flex items-start justify-between mb-8">
    <div>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

// ── Card ──────────────────────────────────────────────────────────────────────
export const Card = ({ children, className = "" }) => (
  <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>
);

// ── Buttons ───────────────────────────────────────────────────────────────────
export const Btn = ({
  as: Component = "button",
  children,
  variant = "primary",
  size = "default",
  loading,
  type = "button",
  className = "",
  ...props
}) => {
  const base = "inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-xs", default: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20",
    secondary: "bg-surface text-foreground border border-border hover:border-primary/50 hover:text-primary",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-surface",
  };
  const extraProps = Component === "button" ? { type } : {};
  return (
    <Component
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={loading}
      {...extraProps}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {children}
    </Component>
  );
};

export const BtnAdd = ({ children = "Add New", ...props }) => (
  <Btn variant="primary" {...props}><Plus className="w-4 h-4" />{children}</Btn>
);

export const BtnEdit = ({ ...props }) => (
  <Btn variant="secondary" size="sm" {...props}><Pencil className="w-3.5 h-3.5" />Edit</Btn>
);

export const BtnDelete = ({ ...props }) => (
  <Btn variant="danger" size="sm" {...props}><Trash2 className="w-3.5 h-3.5" />Delete</Btn>
);

// ── Form fields ───────────────────────────────────────────────────────────────
const inputBase = "w-full px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

export const Field = ({ label, required, error, children }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);

export const Input = ({ className = "", ...props }) => (
  <input className={`${inputBase} ${className}`} {...props} />
);

export const Textarea = ({ className = "", rows = 4, ...props }) => (
  <textarea rows={rows} className={`${inputBase} resize-none ${className}`} {...props} />
);

export const Select = ({ children, className = "", ...props }) => (
  <select className={`${inputBase} ${className}`} {...props}>{children}</select>
);

export const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-primary" : "bg-surface border border-border"}`} />
      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${checked ? "translate-x-4" : ""}`} />
    </div>
    <span className="text-sm text-muted-foreground">{label}</span>
  </label>
);

// ── Alerts ────────────────────────────────────────────────────────────────────
export const Alert = ({ type = "error", message, onClose }) => {
  if (!message) return null;
  const styles = {
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    success: "bg-green-500/10 border-green-500/20 text-green-400",
  };
  const Icon = type === "error" ? AlertCircle : CheckCircle;
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border ${styles[type]} text-sm`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      {onClose && <button onClick={onClose} className="hover:opacity-70"><X className="w-4 h-4" /></button>}
    </div>
  );
};

// ── Modal ─────────────────────────────────────────────────────────────────────
export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-strong rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ── Spinner ───────────────────────────────────────────────────────────────────
export const Spinner = () => (
  <div className="flex items-center justify-center py-16">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

// ── Empty state ───────────────────────────────────────────────────────────────
export const Empty = ({ message = "Nothing here yet." }) => (
  <div className="text-center py-12 text-muted-foreground text-sm">{message}</div>
);

// ── Confirm delete dialog ─────────────────────────────────────────────────────
export const ConfirmDelete = ({ open, onClose, onConfirm, loading, label = "this item" }) => (
  <Modal open={open} onClose={onClose} title="Confirm Delete">
    <p className="text-muted-foreground text-sm mb-6">
      Are you sure you want to delete <strong className="text-foreground">{label}</strong>? This cannot be undone.
    </p>
    <div className="flex gap-3 justify-end">
      <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
      <Btn variant="danger" loading={loading} onClick={onConfirm}>Delete</Btn>
    </div>
  </Modal>
);
