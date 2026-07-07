import { Link } from 'react-router';
import { ArrowRight, Package, Palette, Truck, Wand2, ShoppingBag, Play } from 'lucide-react';
import bgImage from '../../imports/a80882ac3d49822ec0af2dd99f039fcd_6a5c160f-28ec-4bb0-8b62-8c375dc052bf.png';

const CATEGORIES = [
  {
    id: 'boxes',
    name: 'Подарочные коробки',
    description: 'Элегантные коробки с магнитным замком или крышкой — для ювелирных изделий, косметики и премиальных подарков.',
    tags: ['Ювелирные украшения', 'Косметика', 'VIP-подарки'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900',
  },
  {
    id: 'bags',
    name: 'Подарочные пакеты',
    description: 'Крафт и глянцевые пакеты с ручками для розничных магазинов, бутиков и корпоративных наборов.',
    tags: ['Розничные магазины', 'Бутики', 'Корпоративные подарки'],
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900',
  },
  {
    id: 'pouches',
    name: 'Мешочки и органза',
    description: 'Бархатные и органзовые мешочки для украшений, свадебных подарков и памятных сувениров.',
    tags: ['Украшения', 'Свадьбы', 'Сувениры'],
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900',
  },
  {
    id: 'events',
    name: 'Для мероприятий',
    description: 'Коробки для тортов, тубусы для бутылок и корпоративные пакеты — для любого праздника и события.',
    tags: ['Дни рождения', 'Корпоративы', 'Свадьбы'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900',
  },
  {
    id: 'wrapping',
    name: 'Упаковочная бумага',
    description: 'Дизайнерская упаковочная бумага, атласные ленты и декоративные элементы для завершения упаковки.',
    tags: ['Универсальная', 'Праздничная', 'Корпоративная'],
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=900',
  },
];

const brandLogos = ['ООО Подарок', 'ОАО Коробка', 'Яндекс Подарок', 'Prada', 'Cartier', 'Авторусь'];

export default function HomePage() {
  return (
    <div className="bg-background">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-primary text-white overflow-hidden"> 
        <div
          className="absolute inset-0 bg-no-repeat bg-right bg-cover opacity-20 pointer-events-none"
          style={{ 
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: '130% center',
              backgroundSize: '80%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60 pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-7 text-sm text-white/80 border border-white/10">
              <Wand2 className="w-3.5 h-3.5" />
              Онлайн-конструктор упаковки
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] font-medium">
              Упаковка, которая запоминается
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/60 leading-relaxed max-w-lg">
              Готовая упаковка из каталога или уникальный дизайн с вашим логотипом — для любого подарка и события
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/constructor"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary rounded-xl hover:bg-white/90 transition-all font-medium hover:shadow-lg"
              >
                <Wand2 className="w-4 h-4" />
                Создать свой дизайн
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                Каталог товаров
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Advantages ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Palette className="w-6 h-6 text-primary" />, title: 'Свой дизайн', text: 'Онлайн-конструктор с загрузкой логотипа и выбором цвета' },
              { icon: <Package className="w-6 h-6 text-primary" />, title: 'Более 100 видов', text: 'Коробки, пакеты, мешочки и аксессуары для любого повода' },
              { icon: <Truck className="w-6 h-6 text-primary" />, title: 'Доставка по России', text: 'Отправляем в любой регион — быстро и надёжно' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-secondary/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── О компании + видео ─────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video placeholder */}
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-primary shadow-2xl group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900&fit=crop"
                alt="О компании"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium">Как мы создаём упаковку — 2 минуты</p>
              </div>
            </div>

            {/* Company description */}
            <div>
              <div className="inline-block text-xs uppercase tracking-widest text-primary bg-primary/8 px-3 py-1.5 rounded-full mb-5">
                О компании
              </div>
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-5 leading-snug">
                «Дело в коробке» — упаковка с характером
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Мы создаём подарочную упаковку для розничных магазинов, ювелирных брендов, кондитерских и корпоративных мероприятий. Работаем с 2018 года и знаем: красивая упаковка — это первое впечатление, которое нельзя произвести дважды.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                С нашим онлайн-конструктором вы можете создать макет прямо на сайте, загрузить логотип и получить готовую упаковку с доставкой по всей России.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {[['7+', 'лет опыта'], ['500+', 'клиентов'], ['100+', 'видов упаковки']].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-2xl font-semibold text-primary">{n}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand scroll ───────────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-8">Нам доверяют</p>
        <div className="relative">
          <div className="flex animate-scroll">
            {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={i} className="flex-shrink-0 w-44 h-14 flex items-center justify-center mx-8">
                <span className="text-lg text-gray-300 font-serif italic hover:text-gray-400 transition-colors">{brand}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
          .animate-scroll { animation: scroll 30s linear infinite; width: max-content; }
          .animate-scroll:hover { animation-play-state: paused; }
        `}</style>
      </section>

      {/* ── Categories ─────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-xl">
            <h2 className="text-4xl md:text-5xl mb-3 tracking-tight text-gray-900">Категории упаковки</h2>
            <p className="text-gray-500">Посмотрите готовые товары или создайте свой дизайн</p>
          </div>

          <div className="space-y-6">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} rounded-3xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl hover:border-transparent transition-all duration-500`}
              >
                {/* Image */}
                <div className="md:w-[42%] aspect-[16/9] md:aspect-auto overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="md:w-[58%] px-8 py-9 md:px-12 md:py-12 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl text-gray-900 mb-3">{cat.name}</h3>
                  <p className="text-gray-500 leading-relaxed mb-5 text-sm md:text-base max-w-md">{cat.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {cat.tags.map(tag => (
                      <span key={tag} className="text-xs bg-secondary/30 text-primary/80 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/products?category=${cat.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Товары в наличии
                    </Link>
                    <Link
                      to={`/constructor?category=${cat.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/20 text-primary rounded-xl hover:bg-primary/5 transition-all text-sm"
                    >
                      <Wand2 className="w-4 h-4" />
                      Создать дизайн
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-no-repeat bg-right-bottom bg-contain pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&fit=crop')" }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl mb-5 leading-tight">Готовы создать уникальную упаковку?</h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Загрузите логотип, выберите цвет и получите готовый макет — бесплатно и за несколько минут
          </p>
          <Link
            to="/constructor"
            className="inline-flex items-center gap-2 px-9 py-4 bg-white text-primary rounded-xl hover:bg-white/90 transition-all font-medium shadow-lg hover:shadow-xl"
          >
            <Wand2 className="w-5 h-5" />
            Начать создание
          </Link>
        </div>
      </section>
    </div>
  );
}
