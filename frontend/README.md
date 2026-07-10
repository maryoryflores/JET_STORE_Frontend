# JetStore — Frontend

Interfaz de usuario de la plataforma JetStore Digital. Construida con Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 y Zustand.

## Estructura

```
src/
├── app/                    # App Router
│   ├── layout.tsx          # Layout raíz (providers, Navbar, Footer)
│   ├── page.tsx            # Landing page
│   ├── login/page.tsx      # Login + modo invitado
│   ├── registro/page.tsx   # Registro de usuario
│   ├── catalogo/page.tsx   # Catálogo de productos
│   ├── producto/[id]/      # Detalle de producto
│   ├── carrito/page.tsx    # Carrito de compras
│   ├── checkout/           # Checkout + confirmación
│   ├── dashboard/          # Panel de cliente (perfil, historial, biblioteca, favoritos)
│   ├── admin/              # Panel de administración (CRUD, reportes)
│   └── contacto/           # Formulario de contacto
├── components/
│   ├── ui/                 # Componentes reutilizables (Button, Input, Modal, Toast, Spinner)
│   ├── layout/             # Navbar, Footer
│   ├── catalog/            # ProductGrid, ProductFilters
│   ├── checkout/           # OrderSummary
│   ├── product/            # ProductGallery, ProductInfo, RelatedProducts
│   ├── cart/               # CartItem
│   ├── admin/              # AdminHeader, ProductsTable, UsersTable, ...
│   ├── dashboard/          # PurchaseHistory, FavoritesList, ProfileForm, ...
│   ├── home/               # Hero, FeaturedProducts, Categories, ...
│   └── contact/            # ContactForm
├── services/               # Llamadas HTTP (Axios)
│   ├── api.ts              # Configuración Axios (baseURL, interceptor de token)
│   ├── auth.service.ts     # Login, registro, perfil, cerrar sesión
│   ├── product.service.ts  # CRUD de libros
│   ├── cart.service.ts     # Carrito
│   ├── payment.service.ts  # Pagos
│   └── user.service.ts     # Datos de usuario
├── store/                  # Estado global (Zustand)
│   ├── auth-store.ts       # Autenticación + sesión
│   ├── cart-store.ts       # Carrito
│   └── favorites-store.ts  # Favoritos
├── types/index.ts          # Interfaces TypeScript
├── utils/
│   ├── validators.ts       # Schemas Zod (login, registro, perfil)
│   ├── format.ts           # formatCurrency, truncateText, ...
│   └── cn.ts               # Utility para classNames
├── config/                 # Constantes de configuración
└── data/                   # Datos mock (solo contenido estático: testimonios, FAQ, beneficios)
```

## Inicio

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Variables de entorno

No se requieren. La URL del backend está configurada en `src/services/api.ts`:

```typescript
baseURL: 'http://localhost:8080'
```

## Autenticación

El sistema usa tokens UUID enviados en el header `Authorization` (sin prefijo `Bearer`). El token se almacena en `localStorage` bajo la clave `jetstore-auth` y se gestiona via Zustand.

## Roles

| Rol     | Acceso |
|---------|--------|
| ADMIN   | Rutas `/admin/*` — CRUD completo de libros, usuarios, pedidos, reportes |
| CLIENTE | Catálogo, carrito, checkout, dashboard (perfil, historial, biblioteca, favoritos) |
| Guest   | Solo catálogo. Al intentar agregar al carrito se redirige a login |

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Build de producción |
| `npm run start` | Iniciar build de producción |
| `npm run lint` | Linting con ESLint |
