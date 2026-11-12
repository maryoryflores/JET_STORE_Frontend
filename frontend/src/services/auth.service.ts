import api from './api';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

export const authService = {
  login: (nombreUsuario: string, password: string) =>
    api.post<ApiResponse<{ token: string; usuarioId: number; nombreUsuario: string; rol: string }>>(
      '/usuario/login',
      { nombreUsuario, password }
    ),

  register: (data: {
    nombreUsuario: string;
    correo: string;
    password: string;
    rol: string;
  }) => api.post<ApiResponse<{ id: number; nombreUsuario: string; correo: string; rol: string }>>(
    '/usuario/registrar',
    data
  ),

  getProfile: (usuarioId: number) =>
    api.get<ApiResponse<{ id: number; nombreUsuario: string; correo: string; rol: string }>>(
      `/usuario/perfil/${usuarioId}`
    ),

  logout: (token: string) =>
    api.post<ApiResponse<null>>('/usuario/cerrar-sesion', null, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  solicitarRecuperacion: (correo: string) =>
    api.post<ApiResponse<null>>('/usuario/recuperar', { correo }),

  restablecerPassword: (data: {
    token: string;
    password: string;
    confirmPassword: string;
  }) => api.post<ApiResponse<null>>('/usuario/restablecer', data),

  listUsers: () =>
    api.get<ApiResponse<Array<{ id: number; nombreUsuario: string; correo: string; rol: string }>>>(
      '/usuario/todos'
    ),
};
