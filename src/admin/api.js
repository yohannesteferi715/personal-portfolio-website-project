/**
 * API client for admin dashboard.
 * Sends JWT token on all requests after login.
 */

import { ADMIN_ROUTES } from "./constants";

const TOKEN_KEY = "portfolio_admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(method, path, body = null, isFormData = false) {
  const token = getToken();
  const headers = isFormData ? {} : { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = isFormData ? body : JSON.stringify(body);

  const res = await fetch(`/api/v1${path}`, opts);
  if (res.status === 401) {
    clearToken();
    window.location.href = ADMIN_ROUTES.login;
    throw new Error("Session expired");
  }
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
  return data;
}

export const api = {
  // Auth
  login: async (username, password) => {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Login failed");
    setToken(data.access_token);
    return data;
  },

  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    const data = await request("POST", "/auth/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    if (data?.access_token) {
      setToken(data.access_token);
    }
    return data;
  },

  getMe: () => request("GET", "/auth/me"),

  // Profile
  getProfile: () => request("GET", "/profile"),
  updateProfile: (data) => request("PUT", "/profile", data),
  uploadProfilePhoto: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return request("POST", "/profile/photo", fd, true);
  },
  uploadCV: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return request("POST", "/profile/cv", fd, true);
  },
  deleteCV: () => request("DELETE", "/profile/cv"),

  // Skills
  getSkills: () => request("GET", "/skills"),
  createSkill: (data) => request("POST", "/skills", data),
  updateSkill: (id, data) => request("PUT", `/skills/${id}`, data),
  deleteSkill: (id) => request("DELETE", `/skills/${id}`),

  // About
  getAbout: () => request("GET", "/about"),
  updateAbout: (data) => request("PUT", "/about", data),

  // Projects
  getProjects: () => request("GET", "/projects"),
  createProject: (fd) => request("POST", "/projects", fd, true),
  updateProject: (id, fd) => request("PUT", `/projects/${id}`, fd, true),
  deleteProject: (id) => request("DELETE", `/projects/${id}`),

  // Experience
  getExperiences: () => request("GET", "/experience"),
  createExperience: (data) => request("POST", "/experience", data),
  updateExperience: (id, data) => request("PUT", `/experience/${id}`, data),
  deleteExperience: (id) => request("DELETE", `/experience/${id}`),

  // Education
  getEducation: () => request("GET", "/education"),
  createEducation: (data) => request("POST", "/education", data),
  updateEducation: (id, data) => request("PUT", `/education/${id}`, data),
  deleteEducation: (id) => request("DELETE", `/education/${id}`),

  // Testimonials
  getTestimonials: () => request("GET", "/testimonials"),
  createTestimonial: (data) => request("POST", "/testimonials", data),
  updateTestimonial: (id, data) => request("PUT", `/testimonials/${id}`, data),
  deleteTestimonial: (id) => request("DELETE", `/testimonials/${id}`),

  // Articles
  getArticles: () => request("GET", "/articles"),
  createArticle: (data) => request("POST", "/articles", data),
  updateArticle: (id, data) => request("PUT", `/articles/${id}`, data),
  deleteArticle: (id) => request("DELETE", `/articles/${id}`),

  // Stats
  getStats: () => request("GET", "/stats"),
};
