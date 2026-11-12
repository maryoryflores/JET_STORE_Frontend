import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockProducts = vi.hoisted(() => [
  {
    id: 1,
    titulo: 'El Principito',
    autor: 'Saint-Exupery',
    categoria: 'Ficcion',
    precio: 25.5,
    formato: 'PDF',
    imagen: '/img.jpg',
    stock: 10,
    fechaCreacion: '2024-01-01',
  },
  {
    id: 2,
    titulo: 'Cien Anos',
    autor: 'Garcia Marquez',
    categoria: 'Novela',
    precio: 35.0,
    formato: 'FISICO',
    imagen: '/img2.jpg',
    stock: 0,
    fechaCreacion: '2024-02-01',
  },
]);

vi.mock('@/services/product.service', () => ({
  productService: {
    getAll: vi.fn(() =>
      Promise.resolve({ data: { ok: true, mensaje: 'ok', payload: mockProducts } })
    ),
    getCategories: vi.fn(() =>
      Promise.resolve({ data: { ok: true, mensaje: 'ok', payload: [] } })
    ),
  },
}));

vi.mock('@/services/admin.service', () => ({
  adminService: {
    getCategories: vi.fn(() =>
      Promise.resolve({ data: { ok: true, mensaje: 'ok', payload: ['Ficcion', 'Novela'] } })
    ),
    saveProduct: vi.fn(() =>
      Promise.resolve({ data: { ok: true, mensaje: 'ok', payload: null } })
    ),
    deleteProduct: vi.fn(() =>
      Promise.resolve({ data: { ok: true, mensaje: 'ok', payload: null } })
    ),
    addStock: vi.fn(() =>
      Promise.resolve({ data: { ok: true, mensaje: 'ok', payload: null } })
    ),
  },
}));

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(() => ({
    usuario: { id: 1, nombreUsuario: 'Admin', correo: 'admin@test.com', rol: 'ADMIN' },
    token: 'test-token',
    isAuthenticated: true,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    setUsuario: vi.fn(),
  })),
}));

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
  },
}));

import ProductsTable from '@/components/admin/ProductsTable';
import { productService } from '@/services/product.service';
import { adminService } from '@/services/admin.service';
import Swal from 'sweetalert2';

const waitForProducts = () =>
  waitFor(() => expect(screen.getByText('El Principito')).toBeInTheDocument());

describe('ProductsTable', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial rendering', () => {
    it('renders search input', async () => {
      render(<ProductsTable />);
      expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
    });

    it('renders Nuevo Libro button', async () => {
      render(<ProductsTable />);
      expect(screen.getByText('Nuevo Libro')).toBeInTheDocument();
    });

    it('loads and displays products from service', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      expect(screen.getByText('Cien Anos')).toBeInTheDocument();
    });

    it('calls productService.getAll and adminService.getCategories on mount', () => {
      render(<ProductsTable />);
      expect(productService.getAll).toHaveBeenCalledTimes(1);
      expect(adminService.getCategories).toHaveBeenCalledTimes(1);
    });

    it('shows empty state when no products match', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      const input = screen.getByPlaceholderText('Buscar productos...');
      await user.type(input, 'ZZZZ');
      expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    });
  });

  describe('search filtering', () => {
    it('filters by title', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      const input = screen.getByPlaceholderText('Buscar productos...');
      await user.type(input, 'Principito');
      expect(screen.getByText('El Principito')).toBeInTheDocument();
      expect(screen.queryByText('Cien Anos')).not.toBeInTheDocument();
    });

    it('filters by author', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      const input = screen.getByPlaceholderText('Buscar productos...');
      await user.type(input, 'Garcia');
      expect(screen.getByText('Cien Anos')).toBeInTheDocument();
      expect(screen.queryByText('El Principito')).not.toBeInTheDocument();
    });

    it('filters by category', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      const input = screen.getByPlaceholderText('Buscar productos...');
      await user.type(input, 'Novela');
      expect(screen.getByText('Cien Anos')).toBeInTheDocument();
      expect(screen.queryByText('El Principito')).not.toBeInTheDocument();
    });

    it('is case insensitive', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      const input = screen.getByPlaceholderText('Buscar productos...');
      await user.type(input, 'PRINCIPITO');
      expect(screen.getByText('El Principito')).toBeInTheDocument();
      expect(screen.queryByText('Cien Anos')).not.toBeInTheDocument();
    });

    it('shows all products when search is cleared', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      const input = screen.getByPlaceholderText('Buscar productos...');
      await user.type(input, 'Garcia');
      expect(screen.queryByText('El Principito')).not.toBeInTheDocument();
      await user.clear(input);
      expect(screen.getByText('El Principito')).toBeInTheDocument();
      expect(screen.getByText('Cien Anos')).toBeInTheDocument();
    });
  });

  describe('column render functions', () => {
    it('renders first letter of title in imagen column', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      expect(screen.getByText('E')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('renders formatted currency in precio column', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      expect(screen.getByText(/S\//)).toBeInTheDocument();
    });

    it('renders success badge for products with stock > 0', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      expect(screen.getByText('10 uds')).toBeInTheDocument();
    });

    it('renders danger badge for products with stock = 0 (Agotado)', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      expect(screen.getByText('Agotado')).toBeInTheDocument();
    });

    it('renders Editar, Stock and delete buttons in acciones column', async () => {
      render(<ProductsTable />);
      await waitForProducts();
      const editButtons = screen.getAllByText('Editar');
      expect(editButtons.length).toBe(2);
      const stockButtons = screen.getAllByText('Stock');
      expect(stockButtons.length).toBe(2);
    });
  });

  describe('create product flow', () => {
    it('opens create modal when clicking Nuevo Libro', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      expect(screen.getByText('Titulo del libro')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Nombre del autor')).toBeInTheDocument();
      expect(screen.getByText('Crear Libro')).toBeInTheDocument();
    });

    it('shows empty form fields in create modal', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      expect(screen.getByPlaceholderText('Titulo del libro')).toHaveValue('');
      expect(screen.getByPlaceholderText('Nombre del autor')).toHaveValue('');
    });

    it('validates required fields before saving', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      await user.click(screen.getByText('Crear Libro'));
      expect(Swal.fire).toHaveBeenCalledWith(
        'Campos requeridos',
        'Titulo y autor son obligatorios.',
        'warning'
      );
      expect(adminService.saveProduct).not.toHaveBeenCalled();
    });

    it('fills form fields and creates a new product', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));

      await user.type(screen.getByPlaceholderText('Titulo del libro'), 'Nuevo Test');
      await user.type(screen.getByPlaceholderText('Nombre del autor'), 'Autor Test');

      const precioInput = screen.getByLabelText('Precio (S/)');
      await user.clear(precioInput);
      await user.type(precioInput, '99.99');

      const stockInput = screen.getByLabelText('Stock');
      await user.clear(stockInput);
      await user.type(stockInput, '25');

      await user.click(screen.getByText('Crear Libro'));

      await waitFor(() => {
        expect(adminService.saveProduct).toHaveBeenCalledTimes(1);
      });

      expect(adminService.saveProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: 'Nuevo Test',
          autor: 'Autor Test',
          precio: 99.99,
          stock: 25,
        })
      );
    });

    it('calls loadAll after successful save', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      await user.click(screen.getByText('Nuevo Libro'));
      await user.type(screen.getByPlaceholderText('Titulo del libro'), 'Test');
      await user.type(screen.getByPlaceholderText('Nombre del autor'), 'Autor');
      await user.click(screen.getByText('Crear Libro'));

      await waitFor(() => {
        expect(productService.getAll).toHaveBeenCalledTimes(2);
      });
    });

    it('shows success alert after create', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      await user.type(screen.getByPlaceholderText('Titulo del libro'), 'Test');
      await user.type(screen.getByPlaceholderText('Nombre del autor'), 'Autor');
      await user.click(screen.getByText('Crear Libro'));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          'Creado',
          'Libro creado correctamente.',
          'success'
        );
      });
    });

    it('allows changing format selection', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));

      const formatoSelect = screen.getByLabelText('Formato');
      await user.selectOptions(formatoSelect, 'FISICO');
      expect(formatoSelect).toHaveValue('FISICO');

      await user.selectOptions(formatoSelect, 'EBOOK');
      expect(formatoSelect).toHaveValue('EBOOK');
    });

    it('allows filling URL de imagen field', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));

      const imagenInput = screen.getByPlaceholderText('/productos/imagen.jpg');
      await user.type(imagenInput, '/nueva/imagen.jpg');
      expect(imagenInput).toHaveValue('/nueva/imagen.jpg');
    });

    it('allows changing category via select', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));

      const categoriaSelect = screen.getByLabelText('Categoria');
      await user.selectOptions(categoriaSelect, 'Ficcion');
      expect(categoriaSelect).toHaveValue('Ficcion');
    });

    it('handles validation when only titulo is missing', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      await user.type(screen.getByPlaceholderText('Nombre del autor'), 'Solo Autor');
      await user.click(screen.getByText('Crear Libro'));
      expect(Swal.fire).toHaveBeenCalledWith(
        'Campos requeridos',
        'Titulo y autor son obligatorios.',
        'warning'
      );
      expect(adminService.saveProduct).not.toHaveBeenCalled();
    });

    it('handles validation when only autor is missing', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      await user.type(screen.getByPlaceholderText('Titulo del libro'), 'Solo Titulo');
      await user.click(screen.getByText('Crear Libro'));
      expect(Swal.fire).toHaveBeenCalledWith(
        'Campos requeridos',
        'Titulo y autor son obligatorios.',
        'warning'
      );
      expect(adminService.saveProduct).not.toHaveBeenCalled();
    });
  });

  describe('edit product flow', () => {
    it('opens edit modal when clicking Editar', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);

      expect(screen.getByText('Editar Libro')).toBeInTheDocument();
      expect(screen.getByText('Guardar Cambios')).toBeInTheDocument();
    });

    it('pre-fills form with product data in edit modal', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);

      expect(screen.getByPlaceholderText('Titulo del libro')).toHaveValue('El Principito');
      expect(screen.getByPlaceholderText('Nombre del autor')).toHaveValue('Saint-Exupery');
    });

    it('pre-selects correct category in edit modal', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);

      expect(screen.getByLabelText('Formato')).toHaveValue('PDF');
    });

    it('submits edit form and calls saveProduct with product id', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);

      const tituloInput = screen.getByPlaceholderText('Titulo del libro');
      await user.clear(tituloInput);
      await user.type(tituloInput, 'El Principito Editado');

      await user.click(screen.getByText('Guardar Cambios'));

      await waitFor(() => {
        expect(adminService.saveProduct).toHaveBeenCalledTimes(1);
      });

      expect(adminService.saveProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          titulo: 'El Principito Editado',
          autor: 'Saint-Exupery',
        })
      );
    });

    it('shows success alert after edit', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);
      await user.click(screen.getByText('Guardar Cambios'));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          'Actualizado',
          'Libro actualizado correctamente.',
          'success'
        );
      });
    });

    it('reloads data after successful edit', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);
      await user.click(screen.getByText('Guardar Cambios'));

      await waitFor(() => {
        expect(productService.getAll).toHaveBeenCalledTimes(2);
      });
    });

    it('edits second product', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[1]);

      expect(screen.getByPlaceholderText('Titulo del libro')).toHaveValue('Cien Anos');
      expect(screen.getByPlaceholderText('Nombre del autor')).toHaveValue('Garcia Marquez');

      await user.click(screen.getByText('Guardar Cambios'));

      await waitFor(() => {
        expect(adminService.saveProduct).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 2,
            titulo: 'Cien Anos',
          })
        );
      });
    });
  });

  describe('add stock flow', () => {
    it('opens stock modal when clicking Stock button', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[0]);

      expect(screen.getByText('Agregar Stock: El Principito')).toBeInTheDocument();
      expect(screen.getByLabelText('Cantidad')).toHaveValue(1);
    });

    it('submits stock addition with default quantity of 1', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[0]);
      await user.click(screen.getByText('Agregar'));

      await waitFor(() => {
        expect(adminService.addStock).toHaveBeenCalledWith(1, 1);
      });
    });

    it('allows changing stock quantity', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[0]);

      const qtyInput = screen.getByLabelText('Cantidad');
      await user.clear(qtyInput);
      await user.type(qtyInput, '15');
      await user.click(screen.getByText('Agregar'));

      await waitFor(() => {
        expect(adminService.addStock).toHaveBeenCalledWith(1, 15);
      });
    });

    it('shows success alert after adding stock', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[0]);

      const qtyInput = screen.getByLabelText('Cantidad');
      await user.clear(qtyInput);
      await user.type(qtyInput, '5');
      await user.click(screen.getByText('Agregar'));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          'Stock actualizado',
          'Se agregaron 5 unidades.',
          'success'
        );
      });
    });

    it('closes stock modal after successful addition', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[0]);
      await user.click(screen.getByText('Agregar'));

      await waitFor(() => {
        expect(screen.queryByText('Agregar Stock: El Principito')).not.toBeInTheDocument();
      });
    });

    it('adds stock to second product', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[1]);

      expect(screen.getByText('Agregar Stock: Cien Anos')).toBeInTheDocument();
      await user.click(screen.getByText('Agregar'));

      await waitFor(() => {
        expect(adminService.addStock).toHaveBeenCalledWith(2, 1);
      });
    });
  });

  describe('delete product flow', () => {
    it('opens delete confirmation modal when clicking trash icon', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const rows = screen.getAllByRole('row');
      const dataRow = rows.find((r) => r.textContent?.includes('El Principito'));
      const rowButtons = within(dataRow!).getAllByRole('button');
      const deleteButton = rowButtons.find(
        (b) => !b.textContent?.trim() && b.querySelector('svg')
      );

      await user.click(deleteButton!);

      expect(screen.getByText('Eliminar Producto')).toBeInTheDocument();
      expect(
        screen.getByText((_, element) =>
          element?.textContent?.includes('El Principito') ?? false
        )
      ).toBeInTheDocument();
    });

    it('calls deleteProduct and removes product on confirm', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const rows = screen.getAllByRole('row');
      const dataRow = rows.find((r) => r.textContent?.includes('El Principito'));
      const rowButtons = within(dataRow!).getAllByRole('button');
      const deleteButton = rowButtons.find(
        (b) => !b.textContent?.trim() && b.querySelector('svg')
      );

      await user.click(deleteButton!);
      await user.click(screen.getByText('Eliminar'));

      await waitFor(() => {
        expect(adminService.deleteProduct).toHaveBeenCalledWith(1);
      });
    });

    it('removes product from list after successful deletion', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const rows = screen.getAllByRole('row');
      const dataRow = rows.find((r) => r.textContent?.includes('El Principito'));
      const rowButtons = within(dataRow!).getAllByRole('button');
      const deleteButton = rowButtons.find(
        (b) => !b.textContent?.trim() && b.querySelector('svg')
      );

      await user.click(deleteButton!);
      await user.click(screen.getByText('Eliminar'));

      await waitFor(() => {
        expect(screen.queryByText('El Principito')).not.toBeInTheDocument();
      });
      expect(screen.getByText('Cien Anos')).toBeInTheDocument();
    });

    it('shows success alert after deletion', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const rows = screen.getAllByRole('row');
      const dataRow = rows.find((r) => r.textContent?.includes('El Principito'));
      const rowButtons = within(dataRow!).getAllByRole('button');
      const deleteButton = rowButtons.find(
        (b) => !b.textContent?.trim() && b.querySelector('svg')
      );

      await user.click(deleteButton!);
      await user.click(screen.getByText('Eliminar'));

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          'Eliminado',
          'El libro ha sido eliminado.',
          'success'
        );
      });
    });

    it('closes delete modal after successful deletion', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const rows = screen.getAllByRole('row');
      const dataRow = rows.find((r) => r.textContent?.includes('El Principito'));
      const rowButtons = within(dataRow!).getAllByRole('button');
      const deleteButton = rowButtons.find(
        (b) => !b.textContent?.trim() && b.querySelector('svg')
      );

      await user.click(deleteButton!);
      await user.click(screen.getByText('Eliminar'));

      await waitFor(() => {
        expect(screen.queryByText('Eliminar Producto')).not.toBeInTheDocument();
      });
    });
  });

  describe('modal close and cancel buttons', () => {
    it('closes create modal when clicking Cancelar', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      expect(screen.getByText('Crear Libro')).toBeInTheDocument();

      const cancelButtons = screen.getAllByText('Cancelar');
      await user.click(cancelButtons[cancelButtons.length - 1]);

      await waitFor(() => {
        expect(screen.queryByText('Crear Libro')).not.toBeInTheDocument();
      });
    });

    it('closes edit modal when clicking Cancelar', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const editButtons = screen.getAllByText('Editar');
      await user.click(editButtons[0]);
      expect(screen.getByText('Guardar Cambios')).toBeInTheDocument();

      const cancelButtons = screen.getAllByText('Cancelar');
      await user.click(cancelButtons[cancelButtons.length - 1]);

      await waitFor(() => {
        expect(screen.queryByText('Guardar Cambios')).not.toBeInTheDocument();
      });
    });

    it('closes stock modal when clicking Cancelar', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[0]);
      expect(screen.getByText('Agregar Stock: El Principito')).toBeInTheDocument();

      const cancelButtons = screen.getAllByText('Cancelar');
      await user.click(cancelButtons[cancelButtons.length - 1]);

      await waitFor(() => {
        expect(screen.queryByText('Agregar Stock: El Principito')).not.toBeInTheDocument();
      });
    });

    it('closes delete modal when clicking Cancelar', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const rows = screen.getAllByRole('row');
      const dataRow = rows.find((r) => r.textContent?.includes('El Principito'));
      const rowButtons = within(dataRow!).getAllByRole('button');
      const deleteButton = rowButtons.find(
        (b) => !b.textContent?.trim() && b.querySelector('svg')
      );

      await user.click(deleteButton!);
      expect(screen.getByText('Eliminar Producto')).toBeInTheDocument();

      const cancelButtons = screen.getAllByText('Cancelar');
      await user.click(cancelButtons[cancelButtons.length - 1]);

      await waitFor(() => {
        expect(screen.queryByText('Eliminar Producto')).not.toBeInTheDocument();
      });
    });

    it('closes create modal via X button', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));

      const closeBtn = screen.getByRole('button', { name: 'Cerrar' });
      await user.click(closeBtn);

      await waitFor(() => {
        expect(screen.queryByText('Crear Libro')).not.toBeInTheDocument();
      });
    });

    it('does not call saveProduct when cancelling create', async () => {
      render(<ProductsTable />);
      await user.click(screen.getByText('Nuevo Libro'));
      await user.type(screen.getByPlaceholderText('Titulo del libro'), 'Test');

      const cancelButtons = screen.getAllByText('Cancelar');
      await user.click(cancelButtons[cancelButtons.length - 1]);

      expect(adminService.saveProduct).not.toHaveBeenCalled();
    });

    it('does not call deleteProduct when cancelling delete', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const rows = screen.getAllByRole('row');
      const dataRow = rows.find((r) => r.textContent?.includes('El Principito'));
      const rowButtons = within(dataRow!).getAllByRole('button');
      const deleteButton = rowButtons.find(
        (b) => !b.textContent?.trim() && b.querySelector('svg')
      );

      await user.click(deleteButton!);

      const cancelButtons = screen.getAllByText('Cancelar');
      await user.click(cancelButtons[cancelButtons.length - 1]);

      expect(adminService.deleteProduct).not.toHaveBeenCalled();
      expect(screen.getByText('El Principito')).toBeInTheDocument();
    });

    it('does not call addStock when cancelling stock modal', async () => {
      render(<ProductsTable />);
      await waitForProducts();

      const stockButtons = screen.getAllByText('Stock');
      await user.click(stockButtons[0]);

      const cancelButtons = screen.getAllByText('Cancelar');
      await user.click(cancelButtons[cancelButtons.length - 1]);

      expect(adminService.addStock).not.toHaveBeenCalled();
    });
  });
});
