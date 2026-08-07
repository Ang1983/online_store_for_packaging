import type { Product } from './products';
import type { ApiProductDetail } from './api';

export function adaptProduct(api: ApiProductDetail): Product {
  return {
    id: String(api.id),
    name: api.name,
    category: mapCategory(api.category_name),
    price: api.price,
    image: '', // добавьте поле image в бэкенд или используйте первое фото
    description: api.description,
    sizes: api.dimensions
      ? [`${api.dimensions.length_mm}x${api.dimensions.width_mm}x${api.dimensions.height_mm} мм`]
      : [],
    colors: [],
    minOrder: 1,
    mockupTemplate: api.has_mockups ? String(api.id) : undefined,
  };
}

function mapCategory(name: string): Product['category'] {
  const map: Record<string, Product['category']> = {
    'Коробки': 'boxes', 'Пакеты': 'bags',
    'Мешочки': 'pouches', 'Обёртки': 'wrapping',
  };
  return map[name] || 'boxes';
}

