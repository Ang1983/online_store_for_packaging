import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success('Заказ оформлен! С вами свяжутся в ближайшее время.');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-secondary/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-4xl mb-4 text-gray-900 tracking-tight">Корзина пуста</h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">Добавьте товары из каталога, чтобы оформить заказ</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:gap-3 shadow-lg hover:shadow-xl"
          >
            Перейти к покупкам
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl mb-12 tracking-tight">Корзина</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:border-secondary/30 transition-colors">
                <div className="flex gap-6">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden bg-secondary/10 flex-shrink-0 relative">
                    {item.customDesign ? (
                      <div className="relative w-full h-full">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                          <div className="bg-white/90 backdrop-blur-sm rounded shadow-lg p-2 max-w-full max-h-full">
                            <img
                              src={item.customDesign}
                              alt="Кастомный дизайн"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl mb-3">{item.name}</h3>
                    {item.customDesign && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm mb-3">
                        ✓ С вашим дизайном
                      </div>
                    )}
                    <p className="text-3xl text-primary mb-6 tracking-tight">{item.price} ₽</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-secondary/20 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white hover:bg-secondary/50 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white hover:bg-secondary/50 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success('Товар удален из корзины');
                        }}
                        className="ml-auto flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Удалить
                      </button>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-600 mb-2">Итого:</p>
                    <p className="text-xl font-medium">{item.price * item.quantity} ₽</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24 border border-gray-100">
              <h3 className="text-2xl mb-8 tracking-tight">Итого по заказу</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)} шт):</span>
                  <span className="font-medium">{totalPrice} ₽</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Доставка:</span>
                  <span>Рассчитывается отдельно</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium">Всего:</span>
                  <span className="text-4xl text-primary tracking-tight">{totalPrice} ₽</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-6 py-5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:scale-105 text-lg mb-5 shadow-lg hover:shadow-xl"
              >
                Оформить заказ
              </button>

              <Link
                to="/products"
                className="block text-center text-primary hover:text-primary/80 transition-colors py-3"
              >
                Продолжить покупки
              </Link>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <button
                  onClick={() => {
                    if (confirm('Вы уверены, что хотите очистить корзину?')) {
                      clearCart();
                      toast.success('Корзина очищена');
                    }
                  }}
                  className="w-full text-sm text-red-600 hover:text-red-700 transition-colors py-3 hover:bg-red-50 rounded-lg"
                >
                  Очистить корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}