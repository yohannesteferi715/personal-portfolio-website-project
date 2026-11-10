/**
 * Centralized admin dashboard routing constants.
 * The admin route path is loaded dynamically from VITE_ADMIN_BASE_PATH in .env
 * so your private admin route is never hardcoded or pushed to public Git repos.
 */
export const ADMIN_BASE_PATH =
  import.meta.env.VITE_ADMIN_BASE_PATH?.trim() || "/admin/manage";

export const ADMIN_ROUTES = {
  root: ADMIN_BASE_PATH,
  dashboard: ADMIN_BASE_PATH,
  login: `${ADMIN_BASE_PATH}/login`,
  profile: `${ADMIN_BASE_PATH}/profile`,
  about: `${ADMIN_BASE_PATH}/about`,
  projects: `${ADMIN_BASE_PATH}/projects`,
  experience: `${ADMIN_BASE_PATH}/experience`,
  education: `${ADMIN_BASE_PATH}/education`,
  testimonials: `${ADMIN_BASE_PATH}/testimonials`,
  skills: `${ADMIN_BASE_PATH}/skills`,
  articles: `${ADMIN_BASE_PATH}/articles`,
  security: `${ADMIN_BASE_PATH}/security`,
};
