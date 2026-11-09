import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../auth";
import { ADMIN_ROUTES } from "../constants";
import {
  LayoutDashboard, User, FolderKanban, Briefcase,
  MessageSquareQuote, Wrench, BookOpen, LogOut, ExternalLink,
  GraduationCap, FileText, ShieldCheck,
} from "lucide-react";

const links = [
  { to: ADMIN_ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: ADMIN_ROUTES.profile, label: "Profile", icon: User },
  { to: ADMIN_ROUTES.about, label: "About", icon: BookOpen },
  { to: ADMIN_ROUTES.projects, label: "Projects", icon: FolderKanban },
  { to: ADMIN_ROUTES.experience, label: "Experience", icon: Briefcase },
  { to: ADMIN_ROUTES.education, label: "Education", icon: GraduationCap },
  { to: ADMIN_ROUTES.testimonials, label: "Testimonials", icon: MessageSquareQuote },
  { to: ADMIN_ROUTES.skills, label: "Skills", icon: Wrench },
  { to: ADMIN_ROUTES.articles, label: "Articles", icon: FileText },
  { to: ADMIN_ROUTES.security, label: "Security & Password", icon: ShieldCheck },
];

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ADMIN_ROUTES.login);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 glass-strong border-r border-border/50 flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              YT
            </div>
            <div>
              <div className="font-semibold text-sm">Portfolio Admin</div>
              <div className="text-xs text-muted-foreground">Content Manager</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
