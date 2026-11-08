import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { AdminLayout } from "./components/AdminLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ProfilePage } from "./pages/ProfilePage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { EducationPage } from "./pages/EducationPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { SecurityPage } from "./pages/SecurityPage";

const Protected = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
};

export const AdminApp = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="" element={<Protected><Dashboard /></Protected>} />
    <Route path="profile" element={<Protected><ProfilePage /></Protected>} />
    <Route path="about" element={<Protected><AboutPage /></Protected>} />
    <Route path="projects" element={<Protected><ProjectsPage /></Protected>} />
    <Route path="experience" element={<Protected><ExperiencePage /></Protected>} />
    <Route path="education" element={<Protected><EducationPage /></Protected>} />
    <Route path="testimonials" element={<Protected><TestimonialsPage /></Protected>} />
    <Route path="skills" element={<Protected><SkillsPage /></Protected>} />
    <Route path="articles" element={<Protected><ArticlesPage /></Protected>} />
    <Route path="security" element={<Protected><SecurityPage /></Protected>} />
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
);
