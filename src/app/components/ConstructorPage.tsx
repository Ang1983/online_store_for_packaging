import { useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router';
import { ArrowLeft, Upload, X, Check, Wand2, ChevronRight } from 'lucide-react';

const BOX_CATEGORIES = [
  {
    id: 'boxes',
    name: 'Подарочные коробки',
    subtitle: 'Для ювелирных изделий, косметики и VIP-подарков',
    tags: ['Ювелирные украшения', 'Косметика', 'Электроника', 'VIP-подарки'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    previewColors: ['#ffffff', '#1a1a1a', '#c9a84c', '#c0c0c0', '#8b1a1a', '#1a2744'],
  },
  {
    id: 'bags',
    name: 'Подарочные пакеты',
    subtitle: 'Для магазинов, бутиков и корпоративных наборов',
    tags: ['Розничные магазины', 'Бутики', 'Корпоративные подарки'],
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    previewColors: ['#d4a96a', '#ffffff', '#1a1a1a', '#e8c4a0', '#8b6914'],
  },
  {
    id: 'pouches',
    name: 'Мешочки и органза',
    subtitle: 'Для украшений, свадебных подарков и сувениров',
    tags: ['Украшения', 'Свадьбы', 'Сувениры', 'Праздники'],
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    previewColors: ['#6b1a3a', '#1a2744', '#1a3a1a', '#2a1a6b', '#c0c0c0'],
  },
  {
    id: 'events',
    name: 'Для мероприятий',
    subtitle: 'Для тортов, бутылок и корпоративных событий',
    tags: ['Дни рождения', 'Корпоративы', 'Свадьбы', 'Новый год'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    previewColors: ['#ffffff', '#c9a84c', '#1a2744', '#8b1a1a', '#1a1a1a'],
  },
  {
    id: 'wrapping',
    name: 'Упаковочная бумага',
    subtitle: 'Дизайнерская бумага и атласные ленты',
    tags: ['Универсальная', 'Праздничная', 'Корпоративная'],
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800',
    previewColors: ['#c9a84c', '#c0c0c0', '#e8b4c0', '#a0c8e8'],
  },
];

const BOX_SIZES: Record<string, string[]> = {
  boxes: ['S — 10×10×5 см', 'M — 15×15×8 см', 'L — 20×20×10 см', 'XL — 25×25×12 см'],
  bags: ['S — 20×25×10 см', 'M — 30×40×12 см', 'L — 40×50×15 см'],
  pouches: ['XS — 7×9 см', 'S — 10×12 см', 'M — 15×20 см', 'L — 20×28 см'],
  events: ['25×25×12 см', '30×30×15 см', '35×35×18 см', 'Тубус для бутылки'],
  wrapping: ['70×100 см лист', '50×70 см лист', 'Рулон 25 м'],
};

const MATERIALS: Record<string, string[]> = {
  boxes: ['Мелованный картон', 'Дизайнерский картон', 'Переплётный картон', 'Бархатное покрытие'],
  bags: ['Крафт-бумага', 'Мелованная бумага', 'Ламинированная бумага'],
  pouches: ['Бархат', 'Органза', 'Атлас'],
  events: ['Гофрокартон', 'Мелованный картон', 'Крафт-картон'],
  wrapping: ['80 г/м²', '100 г/м² (плотная)', 'Атласная лента 2.5 см'],
};

const FINISH: Record<string, string[]> = {
  boxes: ['Матовая ламинация', 'Глянцевая ламинация', 'Soft-touch', 'Тиснение фольгой'],
  bags: ['Без ламинации', 'Матовая ламинация', 'Глянцевая ламинация'],
  pouches: ['Без отделки', 'С вышивкой', 'С тиснением'],
  events: ['Без ламинации', 'Матовая ламинация', 'Глянцевая ламинация'],
  wrapping: ['Без покрытия', 'Лак УФ'],
};

// SVG mockup previews
function BoxMockup({ color, logoUrl }: { color: string; logoUrl: string | null }) {
  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };
  const light = isLight(color);
  const shadow = light ? '#00000018' : '#00000040';
  const ribbonColor = light ? '#c9a84c' : '#e8c870';
  const textColor = light ? '#888' : '#bbb';

  return (
    <svg viewBox="0 0 260 280" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="130" cy="265" rx="80" ry="10" fill={shadow}/>
      {/* Lid */}
      <rect x="28" y="60" width="204" height="36" rx="6" fill={color} stroke={light ? '#d0d0d0' : '#555'} strokeWidth="1.5"/>
      {/* Lid top shine */}
      <rect x="28" y="60" width="204" height="10" rx="6" fill="rgba(255,255,255,0.12)"/>
      {/* Box body */}
      <rect x="36" y="94" width="188" height="158" rx="6" fill={color} stroke={light ? '#d0d0d0' : '#555'} strokeWidth="1.5"/>
      {/* Body side shadow */}
      <rect x="36" y="94" width="188" height="158" rx="6" fill="rgba(0,0,0,0.04)"/>
      {/* Ribbon vertical */}
      <rect x="117" y="60" width="26" height="192" fill={ribbonColor} opacity="0.85"/>
      {/* Ribbon horizontal on body */}
      <rect x="36" y="136" width="188" height="18" fill={ribbonColor} opacity="0.85"/>
      {/* Bow left loop */}
      <ellipse cx="108" cy="60" rx="24" ry="14" fill={ribbonColor} transform="rotate(-15 108 60)"/>
      {/* Bow right loop */}
      <ellipse cx="152" cy="60" rx="24" ry="14" fill={ribbonColor} transform="rotate(15 152 60)"/>
      {/* Bow center */}
      <circle cx="130" cy="60" r="10" fill={ribbonColor}/>
      <circle cx="130" cy="60" r="5" fill={light ? '#b8942e' : '#f0d080'}/>
      {/* Logo area */}
      <rect x="72" y="160" width="116" height="76" rx="6" fill={light ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'} stroke={light ? '#e0e0e0' : '#444'} strokeWidth="1" strokeDasharray="4 3"/>
      {logoUrl
        ? <image href={logoUrl} x="72" y="160" width="116" height="76" preserveAspectRatio="xMidYMid meet" clipPath="inset(0 round 6px)"/>
        : <text x="130" y="203" textAnchor="middle" fill={textColor} fontSize="14" fontFamily="Georgia, serif" letterSpacing="2">ЛОГО</text>
      }
    </svg>
  );
}

function BagMockup({ color, logoUrl }: { color: string; logoUrl: string | null }) {
  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };
  const light = isLight(color);
  const textColor = light ? '#888' : '#bbb';

  return (
    <svg viewBox="0 0 260 300" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="130" cy="290" rx="70" ry="8" fill="rgba(0,0,0,0.12)"/>
      {/* Handles */}
      <path d="M90 80 Q90 44 130 44 Q170 44 170 80" fill="none" stroke={light ? '#888' : '#ccc'} strokeWidth="5" strokeLinecap="round"/>
      {/* Bag body */}
      <path d="M44 82 Q42 68 56 66 L204 66 Q218 68 216 82 L224 252 Q225 268 210 268 L50 268 Q35 268 36 252 Z" fill={color} stroke={light ? '#d0d0d0' : '#555'} strokeWidth="1.5"/>
      {/* Body top fold */}
      <path d="M44 82 Q42 68 56 66 L204 66 Q218 68 216 82" fill="rgba(255,255,255,0.08)"/>
      {/* Crease lines */}
      <line x1="80" y1="66" x2="70" y2="268" stroke={light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeWidth="1"/>
      <line x1="180" y1="66" x2="190" y2="268" stroke={light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeWidth="1"/>
      {/* Logo area */}
      <rect x="76" y="136" width="108" height="72" rx="6" fill={light ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'} stroke={light ? '#e0e0e0' : '#444'} strokeWidth="1" strokeDasharray="4 3"/>
      {logoUrl
        ? <image href={logoUrl} x="76" y="136" width="108" height="72" preserveAspectRatio="xMidYMid meet"/>
        : <text x="130" y="178" textAnchor="middle" fill={textColor} fontSize="14" fontFamily="Georgia, serif" letterSpacing="2">ЛОГО</text>
      }
    </svg>
  );
}

function PouchMockup({ color, logoUrl }: { color: string; logoUrl: string | null }) {
  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };
  const light = isLight(color);
  const textColor = light ? '#888' : '#bbb';

  return (
    <svg viewBox="0 0 260 300" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="130" cy="290" rx="60" ry="7" fill="rgba(0,0,0,0.12)"/>
      {/* Pouch body */}
      <path d="M72 110 Q60 270 130 278 Q200 270 188 110 Z" fill={color} stroke={light ? '#d0d0d0' : '#555'} strokeWidth="1.5"/>
      {/* Gathered top */}
      <path d="M72 110 Q101 90 130 96 Q159 90 188 110" fill="none" stroke={light ? '#ccc' : '#555'} strokeWidth="2"/>
      {/* Ribbon */}
      <path d="M84 100 Q130 82 176 100" fill="none" stroke="#c9a84c" strokeWidth="6" strokeLinecap="round"/>
      {/* Ribbon bow */}
      <ellipse cx="118" cy="88" rx="16" ry="8" fill="#c9a84c" transform="rotate(-15 118 88)"/>
      <ellipse cx="142" cy="88" rx="16" ry="8" fill="#c9a84c" transform="rotate(15 142 88)"/>
      <circle cx="130" cy="88" r="7" fill="#c9a84c"/>
      <circle cx="130" cy="88" r="3.5" fill="#b8942e"/>
      {/* Logo area */}
      <rect x="86" y="148" width="88" height="60" rx="6" fill={light ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'} stroke={light ? '#e0e0e0' : '#444'} strokeWidth="1" strokeDasharray="4 3"/>
      {logoUrl
        ? <image href={logoUrl} x="86" y="148" width="88" height="60" preserveAspectRatio="xMidYMid meet"/>
        : <text x="130" y="183" textAnchor="middle" fill={textColor} fontSize="14" fontFamily="Georgia, serif" letterSpacing="2">ЛОГО</text>
      }
    </svg>
  );
}

function GenericMockup({ color, logoUrl }: { color: string; logoUrl: string | null }) {
  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };
  const light = isLight(color);
  const textColor = light ? '#888' : '#bbb';

  return (
    <svg viewBox="0 0 260 280" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="130" cy="268" rx="75" ry="9" fill="rgba(0,0,0,0.12)"/>
      <rect x="36" y="56" width="188" height="200" rx="8" fill={color} stroke={light ? '#d0d0d0' : '#555'} strokeWidth="1.5"/>
      <rect x="36" y="56" width="188" height="28" rx="8" fill={light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}/>
      {/* Window */}
      <rect x="68" y="96" width="124" height="88" rx="8" fill="rgba(200,220,255,0.25)" stroke={light ? '#c8d8f0' : '#3a5080'} strokeWidth="1.5"/>
      {logoUrl
        ? <image href={logoUrl} x="68" y="96" width="124" height="88" preserveAspectRatio="xMidYMid meet"/>
        : <text x="130" y="146" textAnchor="middle" fill={textColor} fontSize="14" fontFamily="Georgia, serif" letterSpacing="2">ЛОГО</text>
      }
      <rect x="68" y="200" width="124" height="40" rx="4" fill={light ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'} stroke={light ? '#e8e8e8' : '#3a3a3a'} strokeWidth="1"/>
    </svg>
  );
}

function MockupPreview({ categoryId, color, logoUrl }: { categoryId: string; color: string; logoUrl: string | null }) {
  if (categoryId === 'boxes') return <BoxMockup color={color} logoUrl={logoUrl} />;
  if (categoryId === 'bags') return <BagMockup color={color} logoUrl={logoUrl} />;
  if (categoryId === 'pouches') return <PouchMockup color={color} logoUrl={logoUrl} />;
  return <GenericMockup color={color} logoUrl={logoUrl} />;
}

export default function ConstructorPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') ?? null;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [customColor, setCustomColor] = useState('#ffffff');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [orderSent, setOrderSent] = useState(false);
  const [qty, setQty] = useState('50');
  const fileRef = useRef<HTMLInputElement>(null);

  const category = BOX_CATEGORIES.find(c => c.id === selectedCategory);
  const sizes = selectedCategory ? BOX_SIZES[selectedCategory] ?? [] : [];
  const materials = selectedCategory ? MATERIALS[selectedCategory] ?? [] : [];
  const finishes = selectedCategory ? FINISH[selectedCategory] ?? [] : [];

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUrl(URL.createObjectURL(file));
  }

  // ── Category selection ──────────────────────────────────────────
  if (!selectedCategory) {
    return (
      <div className="bg-background min-h-screen">
        {/* Hero */}
        <div className="bg-primary text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6 text-sm">
              <Wand2 className="w-4 h-4" />
              Онлайн-конструктор
            </div>
            <h1 className="text-4xl md:text-6xl mb-5 text-white leading-tight">Создайте свой дизайн</h1>
            <p className="text-white/65 text-lg max-w-lg mx-auto">
              Выберите тип упаковки, настройте цвет, добавьте логотип — и получите готовый макет
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-center gap-0 mb-16">
            {['Выберите тип', 'Настройте дизайн', 'Отправьте заявку'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${i === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>{i + 1}</div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{step}</span>
                </div>
                {i < 2 && <div className="w-16 md:w-28 h-px bg-gray-200 mx-3 mb-5" />}
              </div>
            ))}
          </div>

          <h2 className="text-2xl text-gray-900 mb-8">Шаг 1 — Выберите тип упаковки</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BOX_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedColor(cat.previewColors[0]);
                  setCustomColor(cat.previewColors[0]);
                }}
                className="group text-left bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/25 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <div className="p-5">
                  <h3 className="text-gray-900 text-base mb-1">{cat.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{cat.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {cat.previewColors.slice(0, 5).map(c => (
                        <span key={c} className="w-4 h-4 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: c }}/>
                      ))}
                    </div>
                    <span className="text-primary text-xs flex items-center gap-1">
                      Выбрать <ChevronRight className="w-3 h-3"/>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────────
  if (orderSent) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 py-16">
          <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500"/>
          </div>
          <h2 className="text-3xl mb-3 text-gray-900">Заявка отправлена</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Наш менеджер свяжется с вами в течение 2 часов для уточнения деталей и расчёта стоимости.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { setOrderSent(false); setSelectedCategory(null); setLogoUrl(null); }}
              className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              Создать ещё один макет
            </button>
            <Link to="/products" className="px-8 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              Посмотреть каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Constructor ──────────────────────────────────────────────────
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-3 text-sm">
            <ArrowLeft className="w-4 h-4"/>
            Изменить тип упаковки
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {['Выберите тип', 'Настройте дизайн', 'Отправьте заявку'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${i === 1 ? 'bg-white text-primary' : i === 0 ? 'bg-white/30 text-white' : 'bg-white/10 text-white/50'}`}>{i === 0 ? <Check className="w-3 h-3"/> : i + 1}</div>
                  <span className={`text-xs hidden sm:block ${i === 1 ? 'text-white' : 'text-white/50'}`}>{step}</span>
                  {i < 2 && <div className="w-8 h-px bg-white/20"/>}
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl text-white mt-3">{category?.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Mockup preview */}
          <div className="lg:col-span-2 lg:sticky lg:top-28 self-start">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 to-secondary/20 p-10 flex items-center justify-center" style={{ minHeight: 360 }}>
                <div className="w-52 h-64">
                  <MockupPreview categoryId={selectedCategory} color={selectedColor} logoUrl={logoUrl}/>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Предварительный макет</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{category?.name}</span>
              </div>
            </div>
            {/* Color chips preview */}
            <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Выбранный цвет</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-gray-200 shadow-sm" style={{ backgroundColor: selectedColor }}/>
                <span className="font-mono text-sm text-gray-600">{selectedColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-3 space-y-7">

            {/* Color */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 mb-5 text-base">Цвет упаковки</h3>
              <div className="flex flex-wrap gap-3 mb-5">
                {category?.previewColors.map(c => (
                  <button
                    key={c}
                    onClick={() => { setSelectedColor(c); setCustomColor(c); }}
                    title={c}
                    className={`w-10 h-10 rounded-xl border-2 transition-all shadow-sm ${selectedColor === c ? 'border-primary scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                    style={{ backgroundColor: c, outline: selectedColor === c ? '2px solid #1a274440' : 'none', outlineOffset: 2 }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <label className="text-sm text-gray-500">Свой цвет</label>
                <input
                  type="color"
                  value={customColor}
                  onChange={e => { setCustomColor(e.target.value); setSelectedColor(e.target.value); }}
                  className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5 bg-white"
                />
                <span className="font-mono text-sm text-gray-500">{customColor.toUpperCase()}</span>
              </div>
            </div>

            {/* Size */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 mb-5 text-base">Размер</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${selectedSize === size ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 mb-5 text-base">Материал</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {materials.map(mat => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${selectedMaterial === mat ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 mb-5 text-base">Отделка</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {finishes.map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`px-4 py-3 rounded-xl border text-sm text-left transition-all ${selectedFinish === f ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo upload */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 mb-2 text-base">Логотип</h3>
              <p className="text-sm text-gray-400 mb-5">Загрузите логотип — он появится на макете выше</p>
              {logoUrl ? (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img src={logoUrl} alt="Логотип" className="w-16 h-16 object-contain rounded-lg bg-white border border-gray-200"/>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium">Логотип загружен</p>
                    <p className="text-xs text-gray-400">Отображается на макете</p>
                  </div>
                  <button
                    onClick={() => { setLogoUrl(null); if (fileRef.current) fileRef.current.value = ''; }}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4"/>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex flex-col items-center gap-3 py-9 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary/40 hover:bg-primary/[0.02] transition-all group"
                >
                  <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Загрузить логотип</p>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, SVG, JPG — до 5 МБ</p>
                  </div>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload}/>
            </div>

            {/* Quantity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-gray-900 mb-2 text-base">Тираж</h3>
              <p className="text-sm text-gray-400 mb-4">Минимальный заказ от 10 штук</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="10"
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                  className="w-32 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <span className="text-sm text-gray-500">штук</span>
              </div>
              <div className="mt-4 p-4 bg-secondary/20 rounded-xl">
                <p className="text-sm text-primary/80 leading-relaxed">
                  Точная стоимость рассчитывается менеджером — зависит от тиража, материала и отделки
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <button
                onClick={() => setOrderSent(true)}
                className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg text-base font-medium"
              >
                <Wand2 className="w-5 h-5"/>
                Отправить макет на расчёт
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                Бесплатный расчёт стоимости · Ответим в течение 2 часов
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
