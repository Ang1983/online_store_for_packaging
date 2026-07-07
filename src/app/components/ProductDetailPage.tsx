import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Upload, ShoppingCart, Palette, Check, Package } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'customizer'>('info');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl mb-4">Товар не найден</h2>
          <Link to="/products" className="text-primary hover:text-primary/80">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
  if (!selectedColor && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    if (quantity < product.minOrder) {
      toast.error(`Минимальный заказ: ${product.minOrder} шт`);
      return;
    }

    addToCart({
      id: product.id + (customImage ? '-custom-' + Date.now() : ''),
      name: product.name,
      price: product.price,
      image: product.image,
      customDesign: customImage || undefined,
      quantity,
    });

    toast.success(`${product.name} добавлен в корзину`);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад к каталогу
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="sticky top-24">
              <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/10 mb-6 relative border border-gray-100 shadow-sm">
                {customImage && activeTab === 'customizer' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-md w-full">
                        <img
                          src={customImage}
                          alt="Ваш дизайн"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {product.mockupTemplate && (
                <div className="bg-secondary/20 rounded-2xl p-5 flex items-start gap-4 border border-secondary/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      Доступна кастомизация
                    </p>
                    <p className="text-sm text-gray-600">
                      Вы можете загрузить свой дизайн и увидеть его на упаковке
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 text-lg">{product.description}</p>

            <div className="bg-primary text-white rounded-2xl p-8 mb-8 shadow-lg">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl tracking-tight">от {product.price} ₽</span>
                <span className="text-white/60 text-lg">/ шт</span>
              </div>
              <p className="text-white/70 mt-2">
                Минимальный заказ: {product.minOrder} шт
              </p>
            </div>

            {product.mockupTemplate && (
              <div className="mb-8">
                <div className="flex gap-2 mb-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === 'info'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Информация
                  </button>
                  <button
                    onClick={() => setActiveTab('customizer')}
                    className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'customizer'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Palette className="w-4 h-4" />
                    Конструктор дизайна
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'customizer' && product.mockupTemplate ? (
              <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 shadow-sm">
                <h3 className="text-xl mb-4">Загрузите свой дизайн</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Загрузите изображение вашего логотипа или дизайна, чтобы увидеть, как он будет выглядеть на упаковке
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="space-y-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:gap-3 shadow-md"
                  >
                    <Upload className="w-5 h-5" />
                    {customImage ? 'Изменить изображение' : 'Загрузить изображение'}
                  </button>

                  {customImage && (
                    <button
                      onClick={() => setCustomImage(null)}
                      className="w-full px-6 py-3 bg-secondary/30 text-gray-700 rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      Сбросить дизайн
                    </button>
                  )}
                </div>

                {customImage && (
                  <div className="mt-5 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-green-800 leading-relaxed">
                      Дизайн загружен! Посмотрите предпросмотр слева
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <label className="block mb-3">
                    Размер
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-4 rounded-xl border-2 transition-all ${
                          selectedSize === size
                            ? 'border-primary bg-secondary/30 text-primary shadow-sm'
                            : 'border-gray-200 hover:border-secondary/50 hover:bg-secondary/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block mb-3">
                    Цвет
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-4 rounded-xl border-2 transition-all ${
                          selectedColor === color
                            ? 'border-primary bg-secondary/30 text-primary shadow-sm'
                            : 'border-gray-200 hover:border-secondary/50 hover:bg-secondary/10'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="mb-8">
              <label className="block mb-3">
                Количество (мин. {product.minOrder} шт)
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                  className="w-24 text-center px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  min={product.minOrder}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center bg-secondary/30 hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-secondary/20 rounded-2xl p-7 mb-8 border border-secondary/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">Цена за единицу:</span>
                <span className="font-medium text-lg">{product.price} ₽</span>
              </div>
              <div className="flex justify-between items-center pt-5 border-t border-gray-200">
                <span className="text-xl font-medium">Итого:</span>
                <span className="text-3xl text-primary tracking-tight">{product.price * quantity} ₽</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:gap-4 text-lg shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-6 h-6" />
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}