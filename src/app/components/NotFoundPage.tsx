import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      <div className="text-center max-w-2xl relative">
        <div className="mb-12">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary mb-6 tracking-tight">404</h1>
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900 tracking-tight">Страница не найдена</h2>
          <p className="text-gray-600 text-xl leading-relaxed max-w-md mx-auto">
            К сожалению, страница, которую вы ищете, не существует или была перемещена
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:gap-3 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-primary border-2 border-primary rounded-xl hover:bg-secondary/20 transition-all hover:gap-3"
          >
            <Search className="w-5 h-5" />
            Каталог товаров
          </Link>
        </div>
      </div>
    </div>
  );
}
