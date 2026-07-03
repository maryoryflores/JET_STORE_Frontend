import { Pedido, Pago, ReporteVenta, ReporteProducto, ReporteCliente } from '@/types';

export const pedidos: Pedido[] = [
  {
    id: 1,
    numeroPedido: 'JET-2025-0001',
    cliente: 'María Fernanda López',
    clienteId: 2,
    email: 'maria.lopez@email.com',
    fecha: '2025-06-01',
    estado: 'completado',
    total: 25,
    metodoPago: 'Visa',
    productos: [
      { productoId: 1, titulo: 'Manual de Enfermería Integral', cantidad: 1, precio: 25, imagen: '/productos/enfermeria.jpg' },
    ],
  },
  {
    id: 2,
    numeroPedido: 'JET-2025-0002',
    cliente: 'Carlos Andrés Pérez',
    clienteId: 3,
    email: 'carlos.perez@email.com',
    fecha: '2025-06-05',
    estado: 'completado',
    total: 60,
    metodoPago: 'Mastercard',
    productos: [
      { productoId: 2, titulo: 'Programación Web Moderna', cantidad: 2, precio: 30, imagen: '/productos/programacion-web.jpg' },
    ],
  },
  {
    id: 3,
    numeroPedido: 'JET-2025-0003',
    cliente: 'María Fernanda López',
    clienteId: 2,
    email: 'maria.lopez@email.com',
    fecha: '2025-06-10',
    estado: 'pendiente',
    total: 35,
    metodoPago: 'Yape',
    productos: [
      { productoId: 4, titulo: 'Inteligencia Artificial Aplicada', cantidad: 1, precio: 35, imagen: '/productos/ia.jpg' },
    ],
  },
];

export const pagos: Pago[] = [
  {
    id: 1,
    pedidoId: 1,
    numeroPedido: 'JET-2025-0001',
    metodo: 'Visa',
    monto: 25,
    estado: 'completado',
    fecha: '2025-06-01',
  },
  {
    id: 2,
    pedidoId: 2,
    numeroPedido: 'JET-2025-0002',
    metodo: 'Mastercard',
    monto: 60,
    estado: 'completado',
    fecha: '2025-06-05',
  },
  {
    id: 3,
    pedidoId: 3,
    numeroPedido: 'JET-2025-0003',
    metodo: 'Yape',
    monto: 35,
    estado: 'pendiente',
    fecha: '2025-06-10',
  },
];

export const reportesVentas: ReporteVenta[] = [
  { mes: 'Enero', ventas: 120, ingresos: 3600 },
  { mes: 'Febrero', ventas: 150, ingresos: 4500 },
  { mes: 'Marzo', ventas: 180, ingresos: 5400 },
  { mes: 'Abril', ventas: 210, ingresos: 6300 },
  { mes: 'Mayo', ventas: 250, ingresos: 7500 },
  { mes: 'Junio', ventas: 300, ingresos: 9000 },
];

export const reportesProductos: ReporteProducto[] = [
  { producto: 'Programación Web Moderna', cantidad: 95, ingresos: 2850 },
  { producto: 'Inteligencia Artificial Aplicada', cantidad: 82, ingresos: 2870 },
  { producto: 'Manual de Enfermería Integral', cantidad: 128, ingresos: 3200 },
  { producto: 'Ciberseguridad', cantidad: 60, ingresos: 1680 },
  { producto: 'Diseño UX/UI', cantidad: 73, ingresos: 1606 },
];

export const reportesClientes: ReporteCliente[] = [
  { cliente: 'María Fernanda López', email: 'maria.lopez@email.com', compras: 8, totalGastado: 320 },
  { cliente: 'Carlos Andrés Pérez', email: 'carlos.perez@email.com', compras: 5, totalGastado: 210 },
  { cliente: 'Laura Beatriz Sánchez', email: 'laura.sanchez@email.com', compras: 4, totalGastado: 175 },
];
