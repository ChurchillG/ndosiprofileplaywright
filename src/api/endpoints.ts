export const ENDPOINTS = {
  login: 'login',
  getProfile: 'profile',
  updateProfile: 'profile', // PUT
  uploadProfilePicture: 'profile/image', // POST, multipart field "profileImage"
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;