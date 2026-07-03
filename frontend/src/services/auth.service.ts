import api from './api';

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    telefono: string;
    documento: string;
  }) => api.post('/auth/register', data),

  verifyToken: () => api.get('/auth/verify'),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};
