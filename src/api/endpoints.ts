export const ENDPOINTS = {
  login: '/login',
  getProfile: '/profile',
  updateProfile: '/profile', // PUT — also handles the profile picture update
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;