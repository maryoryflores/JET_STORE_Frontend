export interface Producto {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  precio: number;
  formato: string;
  imagen?: string;
  stock: number;
  fechaCreacion: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  icono: string;
  imagen: string;
  productCount: number;
}

export interface Testimonio {
  id: number;
  nombre: string;
  avatar: string;
  cargo: string;
  texto: string;
  rating: number;
}

export interface FAQ {
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: string;
}

export interface Beneficio {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface Stat {
  id: number;
  valor: string;
  label: string;
  icono: string;
}

export interface CarritoItem {
  itemId: number;
  libroId: number;
  titulo: string;
  autor: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface CarritoState {
  items: CarritoItem[];
  agregar: (producto: Producto, cantidad?: number) => void;
  eliminar: (libroId: number) => void;
  actualizarCantidad: (libroId: number, cantidad: number) => void;
  vaciar: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export interface Usuario {
  id: number;
  nombreUsuario: string;
  correo: string;
  rol: 'CLIENTE' | 'ADMIN';
}

export interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (nombreUsuario: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUsuario: (usuario: Usuario) => void;
}

export interface FavoritesState {
  items: number[];
  toggle: (productoId: number) => void;
  isFavorite: (productoId: number) => boolean;
}

export interface Compra {
  id: number;
  numeroPedido: string;
  fecha: string;
  estado: 'pendiente' | 'completado' | 'cancelado' | 'reembolsado';
  total: number;
  metodoPago: string;
  productos: CompraItem[];
  direccionEnvio: string;
}

export interface CompraItem {
  productoId: number;
  titulo: string;
  cantidad: number;
  precio: number;
  imagen: string;
}

export interface Pedido {
  id: number;
  numeroPedido: string;
  cliente: string;
  clienteId: number;
  email: string;
  fecha: string;
  estado: string;
  total: number;
  metodoPago: string;
  productos: CompraItem[];
}

export interface Pago {
  id: number;
  pedidoId: number;
  numeroPedido: string;
  metodo: string;
  monto: number;
  estado: string;
  fecha: string;
  comprobante?: string;
}

export interface ReporteVenta {
  mes: string;
  ventas: number;
  ingresos: number;
}

export interface ReporteProducto {
  producto: string;
  cantidad: number;
  ingresos: number;
}

export interface ReporteCliente {
  cliente: string;
  email: string;
  compras: number;
  totalGastado: number;
}

export interface CheckoutFormData {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  documento: string;
  tipoDocumento: string;
  pais: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  codigoPostal: string;
}

export interface PaymentFormData {
  metodo: 'visa' | 'mastercard' | 'yape' | 'plin' | 'transferencia' | 'paypal';
  nombreTitular?: string;
  numeroTarjeta?: string;
  fechaVen?: string;
  cvv?: string;
  telefono?: string;
  documento?: string;
  numeroOperacion?: string;
  comprobante?: File | null;
  banco?: string;
  numeroCuenta?: string;
  cci?: string;
}
