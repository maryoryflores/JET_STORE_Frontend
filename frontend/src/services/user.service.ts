import api from './api';

interface ApiResponse<T> {
  ok: boolean;
  mensaje: string;
  payload: T;
}

export const userService = {
  getProfile: (usuarioId: number) =>
    api.get<ApiResponse<{ id: number; nombreUsuario: string; correo: string; rol: string }>>(
      `/usuario/perfil/${usuarioId}`
    ),

  listUsers: () =>
    api.get<ApiResponse<Array<{ id: number; nombreUsuario: string; correo: string; rol: string }>>>(
      '/usuario/todos'
    ),
};
