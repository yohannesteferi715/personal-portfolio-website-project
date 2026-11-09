/**
 * Centralized admin dashboard routing constants.
 * Changes to the admin path prefix propagate across all dashboard navigation.
 */
export const ADMIN_BASE_PATH = "/admin/yoni715";

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
