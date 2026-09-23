export const ENDPOINTS = {
  login: 'login',
  getProfile: 'profile',
  updateProfile: 'profile',
  uploadProfilePicture: 'profile/image',
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;