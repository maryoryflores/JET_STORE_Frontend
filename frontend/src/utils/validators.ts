import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  nombres: z.string().min(2, 'Ingresa tus nombres'),
  apellidos: z.string().min(2, 'Ingresa tus apellidos'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().min(9, 'Ingresa un número telefónico válido'),
  documento: z.string().min(8, 'Ingresa un documento válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const checkoutSchema = z.object({
  nombres: z.string().min(2, 'Ingresa tus nombres'),
  apellidos: z.string().min(2, 'Ingresa tus apellidos'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().min(9, 'Ingresa un número telefónico válido'),
  documento: z.string().min(8, 'Ingresa un documento válido'),
  tipoDocumento: z.string().min(1, 'Selecciona un tipo de documento'),
  pais: z.string().min(2, 'Ingresa tu país'),
  departamento: z.string().min(2, 'Ingresa tu departamento'),
  ciudad: z.string().min(2, 'Ingresa tu ciudad'),
  direccion: z.string().min(5, 'Ingresa tu dirección'),
  codigoPostal: z.string().optional(),
});

export const profileSchema = z.object({
  nombres: z.string().min(2, 'Ingresa tus nombres'),
  apellidos: z.string().min(2, 'Ingresa tus apellidos'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().min(9, 'Ingresa un número telefónico válido'),
  documento: z.string().min(8, 'Ingresa un documento válido'),
  pais: z.string().min(2, 'Ingresa tu país'),
  departamento: z.string().min(2, 'Ingresa tu departamento'),
  ciudad: z.string().min(2, 'Ingresa tu ciudad'),
  direccion: z.string().min(5, 'Ingresa tu dirección'),
  codigoPostal: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
