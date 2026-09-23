/**
 * Real endpoints confirmed via network-logger discovery against the
 * live Ndosi automation test site.
 */
export const ENDPOINTS = {
  login: '/login',
  getProfile: '/profile',
  updateProfile: '/profile', // PUT — saves text fields
  uploadProfilePicture: '/profile/image', // POST — separate call, fires after updateProfile
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;