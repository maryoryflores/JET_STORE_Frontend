import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  checkoutSchema,
  profileSchema,
} from '@/utils/validators';

// Autor: Lorena (Frontend) — 10 pruebas unitarias sobre los validadores Zod.

describe('loginSchema', () => {
  it('acepta credenciales válidas', () => {
    const resultado = loginSchema.safeParse({
      nombreUsuario: 'daniel',
      password: 'secret123',
    });
    expect(resultado.success).toBe(true);
  });

  it('rechaza cuando el nombre de usuario está vacío', () => {
    const resultado = loginSchema.safeParse({
      nombreUsuario: '',
      password: 'secret123',
    });
    expect(resultado.success).toBe(false);
  });

  it('rechaza una contraseña menor a 6 caracteres', () => {
    const resultado = loginSchema.safeParse({
      nombreUsuario: 'daniel',
      password: '123',
    });
    expect(resultado.success).toBe(false);
  });
});

describe('registerSchema', () => {
  it('acepta un registro válido', () => {
    const resultado = registerSchema.safeParse({
      nombreUsuario: 'lorena',
      correo: 'lorena@jetstore.pe',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    expect(resultado.success).toBe(true);
  });

  it('rechaza cuando las contraseñas no coinciden', () => {
    const resultado = registerSchema.safeParse({
      nombreUsuario: 'lorena',
      correo: 'lorena@jetstore.pe',
      password: 'secret123',
      confirmPassword: 'otra1234',
    });
    expect(resultado.success).toBe(false);
  });

  it('rechaza un correo inválido', () => {
    const resultado = registerSchema.safeParse({
      nombreUsuario: 'lorena',
      correo: 'no-es-correo',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    expect(resultado.success).toBe(false);
  });

  it('rechaza un nombre de usuario menor a 3 caracteres', () => {
    const resultado = registerSchema.safeParse({
      nombreUsuario: 'lo',
      correo: 'lorena@jetstore.pe',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    expect(resultado.success).toBe(false);
  });
});

describe('checkoutSchema', () => {
  it('acepta un formulario de pago válido', () => {
    const resultado = checkoutSchema.safeParse({
      nombres: 'Maria',
      apellidos: 'Lopez',
      email: 'maria@jetstore.pe',
      telefono: '987654321',
      documento: '12345678',
      tipoDocumento: 'DNI',
      pais: 'Perú',
      departamento: 'Lima',
      ciudad: 'Lima',
      direccion: 'Av. Principal 123',
    });
    expect(resultado.success).toBe(true);
  });

  it('rechaza un email de pago inválido', () => {
    const resultado = checkoutSchema.safeParse({
      nombres: 'Maria',
      apellidos: 'Lopez',
      email: 'correo-malo',
      telefono: '987654321',
      documento: '12345678',
      tipoDocumento: 'DNI',
      pais: 'Perú',
      departamento: 'Lima',
      ciudad: 'Lima',
      direccion: 'Av. Principal 123',
    });
    expect(resultado.success).toBe(false);
  });
});

describe('profileSchema', () => {
  it('rechaza un correo de perfil inválido', () => {
    const resultado = profileSchema.safeParse({
      nombreUsuario: 'daniel',
      correo: 'malcorreo',
    });
    expect(resultado.success).toBe(false);
  });
});
