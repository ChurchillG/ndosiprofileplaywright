export const ENDPOINTS = {
  login: '/api/auth/login',
  getProfile: '/api/profile',
  updateProfile: '/api/profile',
  uploadProfilePicture: '/api/profile/picture',
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;