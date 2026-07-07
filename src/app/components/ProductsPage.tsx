import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Box, ShoppingBag, Package as PackageIcon, Gift, Sparkles, Grid3x3, Wand2 } from 'lucide-react';
import { products, categories } from '../data/products';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Grid3x3: <Grid3x3 className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
  Package: <PackageIcon className="w-4 h-4" />,
  Gift: <Gift className="w-4 h-4" />,
  PartyPopper: <Sparkles className="w-4 h-4" />,
};

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') ?? 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('name');

  const filteredProducts = products.filter(p =>
    selectedCategory === 'all' || p.category === selectedCategory
  );
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const activeCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-2 text-white">Каталог товаров</h1>
          <p className="text-white/55 text-base">Более {products.length} видов упаковки для любых целей</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category pills */}
        <div className="py-7 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {CATEGORY_ICONS[cat.icon]}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {activeCategory && selectedCategory !== 'all'
                ? <><span className="text-gray-900 font-medium">{activeCategory.name}</span> — </>
                : null}
              {sortedProducts.length} товар{sortedProducts.length === 1 ? '' : sortedProducts.length < 5 ? 'а' : 'ов'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Сортировка:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="name">По названию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-16">
          {sortedProducts.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/15 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-secondary/5 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.mockupTemplate && (
                  <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Кастомизация
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-sm font-medium text-gray-900 mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
                  <span className="text-lg font-semibold text-primary">от {product.price} ₽</span>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">от {product.minOrder} шт</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Design CTA card */}
          {selectedCategory !== 'all' && (
            <Link
              to={`/constructor?category=${selectedCategory}`}
              className="group bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:bg-primary/10 hover:border-primary/40 transition-all min-h-[280px]"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Wand2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-primary mb-1">Нет нужного?</p>
              <p className="text-xs text-gray-400 leading-relaxed">Создайте свой дизайн в конструкторе</p>
            </Link>
          )}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <PackageIcon className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg text-gray-500 mb-2">Товары не найдены</h3>
            <p className="text-sm text-gray-400">Попробуйте изменить категорию или сортировку</p>
          </div>
        )}
      </div>
    </div>
  );
}
