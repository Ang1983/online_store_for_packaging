import { Outlet, Link, useLocation } from 'react-router';
import { ShoppingCart, Phone, Home, Grid3x3, MessageCircle, Send, X, Wand2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useRef, useEffect } from 'react';
import logoImg from 'src/imports/a80882ac3d49822ec0af2dd99f039fcd_6a5c160f-28ec-4bb0-8b62-8c375dc052bf.png';

const PHONE_NUMBER = '+7 (495) 123-45-67';
const PHONE_RAW = '74951234567';

const messengers = [
  {
    name: 'Позвонить',
    icon: <Phone className="w-4 h-4" />,
    href: `tel:+${PHONE_RAW}`,
    color: 'text-green-600',
    bg: 'hover:bg-green-50',
  },
  {
    name: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    href: `https://wa.me/${PHONE_RAW}`,
    color: 'text-[#25D366]',
    bg: 'hover:bg-[#25D366]/10',
  },
  {
    name: 'Telegram',
    icon: <Send className="w-4 h-4" />,
    href: `https://t.me/+${PHONE_RAW}`,
    color: 'text-[#2AABEE]',
    bg: 'hover:bg-[#2AABEE]/10',
  },
  {
    name: 'MAX',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.26 14.4l-2.95-.924c-.64-.203-.654-.64.136-.954l11.5-4.433c.538-.194 1.006.131.617.16z"/>
      </svg>
    ),
    href: `https://max.ru/`,
    color: 'text-[#0077FF]',
    bg: 'hover:bg-[#0077FF]/10',
  },
  {
    name: 'VK',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.712-1.033-1.01-1.49-.604-1.49.657v1.55c0 .468-.148.75-1.375.75-2.025 0-4.266-1.225-5.84-3.506C5.1 11.967 4.5 9.82 4.5 9.302c0-.234.064-.452.3-.506.076-.016.151-.024.228-.024h1.744c.492 0 .68.22.87.737.96 2.77 2.56 5.2 3.218 5.2.247 0 .36-.113.36-.736V11.22c-.075-1.32-.773-1.428-.773-1.9 0-.226.188-.454.492-.454h2.745c.414 0 .56.226.56.714v3.836c0 .415.188.56.302.56.248 0 .454-.145.907-.598 1.41-1.58 2.407-4.01 2.407-4.01.133-.3.36-.582.85-.582h1.744c.525 0 .643.27.525.636-.22.668-2.35 4.024-2.35 4.024-.187.3-.25.434 0 .77.188.26.8.8 1.21 1.285.75.884 1.327 1.63 1.48 2.143.17.51-.104.77-.617.77z"/>
      </svg>
    ),
    href: `https://vk.me/+${PHONE_RAW}`,
    color: 'text-[#4680C2]',
    bg: 'hover:bg-[#4680C2]/10',
  },
];

export default function RootLayout() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [phoneOpen, setPhoneOpen] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node)) {
        setPhoneOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const PhoneDropdown = ({ above = false }: { above?: boolean }) => (
    <div className={`absolute ${above ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0'} w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50`}>
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Связаться</span>
        <button onClick={() => setPhoneOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
      {messengers.map((m) => (
        <a
          key={m.name}
          href={m.href}
          target={m.name !== 'Позвонить' ? '_blank' : undefined}
          rel="noopener noreferrer"
          onClick={() => setPhoneOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 ${m.color} ${m.bg} transition-colors`}
        >
          {m.icon}
          <span className="font-medium text-gray-800">{m.name}</span>
        </a>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logoImg} alt="Дело в коробке" className="w-12 h-12 object-contain rounded-xl" />
              <span className="text-xl font-semibold text-gray-900 tracking-tight hidden sm:block">Дело в коробке</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-5">
              <Link to="/" className={`flex items-center gap-2 transition-colors ${isActive('/') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                <Home className="w-4 h-4" />
                Главная
              </Link>
              <Link to="/products" className={`flex items-center gap-2 transition-colors ${isActive('/products') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                <Grid3x3 className="w-4 h-4" />
                Товары
              </Link>
              <Link
                to="/constructor"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive('/constructor') ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                Создать свой дизайн
              </Link>
              <Link to="/about" className={`flex items-center gap-2 transition-colors ${isActive('/about') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                <MessageCircle className="w-4 h-4" />
                О нас
              </Link>

              {/* Phone dropdown */}
              <div className="relative" ref={phoneRef}>
                <button
                  onClick={() => setPhoneOpen(!phoneOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/20 text-primary hover:bg-primary/5 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{PHONE_NUMBER}</span>
                </button>
                {phoneOpen && <PhoneDropdown />}
              </div>
            </nav>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-7 h-7 flex items-center justify-center rounded-full font-medium shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-around py-2">
            <Link to="/" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/') ? 'text-primary' : 'text-gray-600'}`}>
              <Home className="w-5 h-5" /><span className="text-xs">Главная</span>
            </Link>
            <Link to="/products" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/products') ? 'text-primary' : 'text-gray-600'}`}>
              <Grid3x3 className="w-5 h-5" /><span className="text-xs">Товары</span>
            </Link>
            <Link to="/constructor" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/constructor') ? 'text-primary' : 'text-gray-600'}`}>
              <Wand2 className="w-5 h-5" /><span className="text-xs">Дизайн</span>
            </Link>
            <Link to="/about" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/about') ? 'text-primary' : 'text-gray-600'}`}>
              <MessageCircle className="w-5 h-5" /><span className="text-xs">О нас</span>
            </Link>
            <div className="relative" ref={phoneRef}>
              <button
                onClick={() => setPhoneOpen(!phoneOpen)}
                className={`flex flex-col items-center gap-1 px-3 py-2 ${phoneOpen ? 'text-primary' : 'text-gray-600'}`}
              >
                <Phone className="w-5 h-5" /><span className="text-xs">Звонок</span>
              </button>
              {phoneOpen && <PhoneDropdown above />}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={logoImg} alt="Дело в коробке" className="w-10 h-10 object-contain rounded-xl" />
                <span className="text-xl font-semibold tracking-tight">Дело в коробке</span>
              </div>
              <p className="text-white/60 leading-relaxed">Премиальная упаковка для ваших подарков и мероприятий</p>
            </div>
            <div>
              <h3 className="font-semibold mb-5 text-lg">Навигация</h3>
              <ul className="space-y-3 text-white/60">
                <li><Link to="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Товары</Link></li>
                <li><Link to="/constructor" className="hover:text-white transition-colors">Создать дизайн</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">О нас</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-5 text-lg">Контакты</h3>
              <ul className="space-y-3 text-white/60">
                <li>Email: info@delovkorobke.ru</li>
                <li>Телефон: {PHONE_NUMBER}</li>
                <li>Москва, ул. Примерная, д. 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/50">
            © 2026 Дело в коробке. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
