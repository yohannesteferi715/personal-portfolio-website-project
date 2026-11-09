import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { ADMIN_ROUTES } from "../constants";
import { Card, Spinner } from "../components/ui";
import { PageHeader } from "../components/ui";
import {
  FolderKanban, Briefcase, MessageSquareQuote,
  Wrench, User, BookOpen, ArrowRight, ShieldCheck,
} from "lucide-react";

const StatCard = ({ icon: Icon, label, value, to, color }) => (
  <Link to={to} className="block">
    <Card className="hover:border-primary/30 hover:glow-border transition-all duration-300 group cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
          <p className="text-4xl font-bold" style={{ color }}>{value ?? "—"}</p>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground group-hover:text-primary transition-colors">
        Manage <ArrowRight className="w-3 h-3" />
      </div>
    </Card>
  </Link>
);

const quickLinks = [
  { to: ADMIN_ROUTES.profile, label: "Edit Profile", icon: User, desc: "Name, bio, photo, social links" },
  { to: ADMIN_ROUTES.about, label: "Edit About", icon: BookOpen, desc: "Story, mission quote, highlights" },
  { to: ADMIN_ROUTES.projects, label: "Manage Projects", icon: FolderKanban, desc: "Add, edit or delete projects" },
  { to: ADMIN_ROUTES.experience, label: "Manage Experience", icon: Briefcase, desc: "Timeline & work history" },
  { to: ADMIN_ROUTES.testimonials, label: "Manage Testimonials", icon: MessageSquareQuote, desc: "Client quotes & reviews" },
  { to: ADMIN_ROUTES.skills, label: "Manage Skills", icon: Wrench, desc: "Technologies & categories" },
  { to: ADMIN_ROUTES.security, label: "Security & Password", icon: ShieldCheck, desc: "Change admin password & credentials" },
];

export const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your portfolio content."
      />

      {/* Stats */}
      {!stats ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={FolderKanban} label="Projects" value={stats.projects} to={ADMIN_ROUTES.projects} color="#20b2a6" />
          <StatCard icon={Briefcase} label="Experience" value={stats.experiences} to={ADMIN_ROUTES.experience} color="#f5a623" />
          <StatCard icon={MessageSquareQuote} label="Testimonials" value={stats.testimonials} to={ADMIN_ROUTES.testimonials} color="#a78bfa" />
          <StatCard icon={Wrench} label="Skills" value={stats.skills} to={ADMIN_ROUTES.skills} color="#34d399" />
        </div>
      )}

      {/* Quick links */}
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Quick Access</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map(({ to, label, icon: Icon, desc }) => (
          <Link key={to} to={to} className="block group">
            <Card className="hover:border-primary/30 transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
