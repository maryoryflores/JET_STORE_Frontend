import api from './api';

export const userService = {
  getProfile: () => api.get('/usuarios/perfil'),

  updateProfile: (data: Partial<{
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    departamento: string;
    pais: string;
    codigoPostal: string;
  }>) => api.put('/usuarios/perfil', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/usuarios/cambiar-password', data),

  getCompras: () => api.get('/usuarios/compras'),

  getBiblioteca: () => api.get('/usuarios/biblioteca'),
};
