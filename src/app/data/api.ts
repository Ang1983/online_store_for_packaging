const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || `API Error: ${res.status}`);
  }
  return res.json();
}

// === ТОВАРЫ ===
export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  material: string;
  category_name: string;
  description: string;
  dimensions: { length_mm: number; width_mm: number; height_mm: number } | null;
  stock: { quantity: number; available_quantity: number };
  has_mockups: boolean;
}

export interface ApiProductDetail extends ApiProduct {
  mockup_templates: ApiMockup[];
}

export const productsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<ApiProduct[]>(`/products/${qs}`);
  },
  detail: (id: number) => request<ApiProductDetail>(`/products/${id}/`),
  mockups: (productId: number) => request<ApiMockup[]>(`/products/${productId}/mockups/`),
};

// === МОКАПЫ ===
export interface ApiMockup {
  id: number;
  name: string;
  base_image: string;
  mask_image: string | null;
  preview_overlay: string | null;
  print_area: { x: number; y: number; width: number; height: number };
  canvas_dpi: number;
  render_config: Record<string, unknown>;
  version: number;
}

export const mockupsApi = {
  detail: (id: number) => request<ApiMockup>(`/mockups/${id}/`),
};

// === ДИЗАЙНЫ ===
export interface ApiDesign {
  id: number;
  name: string;
  preview_image: string | null;
  source_file: string | null;
  product: number;
  mockup_template: number | null;
}

export const designsApi = {
  create: (data: FormData) =>
    request<ApiDesign>('/designs/', { method: 'POST', body: data, headers: {} }),
};

// === ЗАКАЗЫ ===
export interface CreateOrderPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  comment?: string;
  items: Array<{
    product_id: number;
    quantity: number;
    design_id?: number | null;
    mockup_template_id?: number | null;
  }>;
}

export interface ApiOrder {
  id: number;
  customer_name: string;
  status: string;
  status_display: string;
  total_price: number;
  items: Array<{
    id: number;
    product: ApiProduct;
    quantity: number;
    price_at_purchase: number;
    subtotal: number;
  }>;
  created_at: string;
}

export const ordersApi = {
  create: (payload: CreateOrderPayload) =>
    request<ApiOrder>('/orders/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  detail: (id: number) => request<ApiOrder>(`/orders/${id}/`),
};

