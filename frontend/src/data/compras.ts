import { Compra } from '@/types';

export const compras: Compra[] = [
  {
    id: 1,
    numeroPedido: 'JET-2025-0001',
    fecha: '2025-06-01',
    estado: 'completado',
    total: 25,
    metodoPago: 'Visa **** 4242',
    productos: [
      { productoId: 1, titulo: 'Manual de Enfermería Integral', cantidad: 1, precio: 25, imagen: '/productos/enfermeria.jpg' },
    ],
    direccionEnvio: 'Calle Las Flores 456, San Isidro, Lima',
  },
  {
    id: 2,
    numeroPedido: 'JET-2025-0002',
    fecha: '2025-06-05',
    estado: 'completado',
    total: 60,
    metodoPago: 'Mastercard **** 5678',
    productos: [
      { productoId: 2, titulo: 'Programación Web Moderna con React y Next.js', cantidad: 2, precio: 30, imagen: '/productos/programacion-web.jpg' },
    ],
    direccionEnvio: 'Av. Ejército 789, Arequipa',
  },
  {
    id: 3,
    numeroPedido: 'JET-2025-0003',
    fecha: '2025-06-10',
    estado: 'completado',
    total: 35,
    metodoPago: 'Yape',
    productos: [
      { productoId: 4, titulo: 'Inteligencia Artificial Aplicada', cantidad: 1, precio: 35, imagen: '/productos/ia.jpg' },
      { productoId: 6, titulo: 'Diseño UX/UI: De Principiante a Experto', cantidad: 1, precio: 22, imagen: '/productos/ux-ui.jpg' },
    ],
    direccionEnvio: 'Calle Las Flores 456, San Isidro, Lima',
  },
];
