import { Stat, Beneficio } from '@/types';

export const stats: Stat[] = [
  {
    id: 1,
    valor: '15,000+',
    label: 'Libros Vendidos',
    icono: 'HiBookOpen',
  },
  {
    id: 2,
    valor: '8,500+',
    label: 'Clientes Satisfechos',
    icono: 'HiUserGroup',
  },
  {
    id: 3,
    valor: '500+',
    label: 'Títulos Disponibles',
    icono: 'HiLibrary',
  },
  {
    id: 4,
    valor: '4.8/5',
    label: 'Valoración Promedio',
    icono: 'HiStar',
  },
];

export const beneficios: Beneficio[] = [
  {
    id: 1,
    titulo: 'Entrega Inmediata',
    descripcion: 'Descarga tus libros al instante después de realizar la compra. Sin esperas ni envíos físicos.',
    icono: 'HiLightningBolt',
  },
  {
    id: 2,
    titulo: 'Pago Seguro',
    descripcion: 'Tus datos están protegidos con encriptación SSL. Procesamos pagos de forma segura y confiable.',
    icono: 'HiShieldCheck',
  },
  {
    id: 3,
    titulo: 'Acceso Permanente',
    descripcion: 'Tus compras estarán disponibles en tu biblioteca digital para siempre. Descarga cuando quieras.',
    icono: 'HiCloudDownload',
  },
  {
    id: 4,
    titulo: 'Actualizaciones Gratis',
    descripcion: 'Cuando un libro se actualiza, recibes la nueva versión sin costo adicional. Siempre tendrás la información más reciente.',
    icono: 'HiRefresh',
  },
  {
    id: 5,
    titulo: 'Multi-dispositivo',
    descripcion: 'Lee tus libros en cualquier dispositivo: PC, tablet, smartphone o lector de eBooks. Sin restricciones.',
    icono: 'HiDeviceMobile',
  },
  {
    id: 6,
    titulo: 'Garantía de Satisfacción',
    descripcion: 'Si no estás satisfecho, puedes solicitar un reembolso dentro de los primeros 7 días. Sin preguntas.',
    icono: 'HiBadgeCheck',
  },
];
