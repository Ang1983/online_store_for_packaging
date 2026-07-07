export interface Product {
  id: string;
  name: string;
  category: 'boxes' | 'bags' | 'pouches' | 'wrapping' | 'events';
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  minOrder: number;
  mockupTemplate?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Подарочная коробка Premium',
    category: 'boxes',
    price: 250,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
    description: 'Элегантная подарочная коробка из плотного картона с магнитным замком. Идеально подходит для ювелирных изделий и премиальных подарков.',
    sizes: ['S (10x10x5 см)', 'M (15x15x8 см)', 'L (20x20x10 см)'],
    colors: ['Белый', 'Черный', 'Золотой', 'Серебряный'],
    minOrder: 10,
    mockupTemplate: 'box-premium'
  },
  {
    id: '2',
    name: 'Крафт-пакет с ручками',
    category: 'bags',
    price: 45,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    description: 'Экологичный пакет из крафт-бумаги с витыми ручками. Отлично подходит для бутиков и магазинов.',
    sizes: ['S (20x25x10 см)', 'M (30x40x12 см)', 'L (40x50x15 см)'],
    colors: ['Натуральный', 'Белый', 'Черный'],
    minOrder: 50,
    mockupTemplate: 'bag-kraft'
  },
  {
    id: '3',
    name: 'Бархатный мешочек',
    category: 'pouches',
    price: 85,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    description: 'Роскошный бархатный мешочек с атласной лентой. Идеален для ювелирных изделий и деликатных подарков.',
    sizes: ['XS (7x9 см)', 'S (10x12 см)', 'M (15x20 см)'],
    colors: ['Бордовый', 'Темно-синий', 'Черный', 'Изумрудный'],
    minOrder: 20,
    mockupTemplate: 'pouch-velvet'
  },
  {
    id: '4',
    name: 'Упаковочная бумага дизайнерская',
    category: 'wrapping',
    price: 120,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800',
    description: 'Премиальная упаковочная бумага плотностью 80г/м². Рулон 70x100 см.',
    sizes: ['70x100 см'],
    colors: ['Золотой горошек', 'Серебряные звезды', 'Флоральный', 'Геометрия'],
    minOrder: 10,
    mockupTemplate: 'paper-designer'
  },
  {
    id: '5',
    name: 'Коробка для торта',
    category: 'events',
    price: 180,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    description: 'Прочная картонная коробка с окошком для тортов и кондитерских изделий.',
    sizes: ['25x25x12 см', '30x30x15 см', '35x35x18 см'],
    colors: ['Белый', 'Крафт'],
    minOrder: 25,
    mockupTemplate: 'box-cake'
  },
  {
    id: '6',
    name: 'Подарочный пакет глянцевый',
    category: 'bags',
    price: 65,
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800',
    description: 'Глянцевый ламинированный пакет с лентами-ручками. Яркий и праздничный.',
    sizes: ['S (18x23x10 см)', 'M (26x32x12 см)', 'L (32x42x14 см)'],
    colors: ['Красный', 'Синий', 'Золотой', 'Серебряный', 'Розовый'],
    minOrder: 30,
    mockupTemplate: 'bag-glossy'
  },
  {
    id: '7',
    name: 'Коробка-трансформер',
    category: 'boxes',
    price: 195,
    image: 'https://images.unsplash.com/photo-1606914469633-bd39206ea739?w=800',
    description: 'Складная коробка с оригинальным дизайном. Легко собирается без клея.',
    sizes: ['M (12x12x12 см)', 'L (18x18x18 см)', 'XL (25x25x25 см)'],
    colors: ['Белый', 'Крафт', 'Черный'],
    minOrder: 20,
    mockupTemplate: 'box-transformer'
  },
  {
    id: '8',
    name: 'Органза мешочек',
    category: 'pouches',
    price: 35,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800',
    description: 'Прозрачный мешочек из органзы с атласной лентой. Для небольших сувениров.',
    sizes: ['S (7x9 см)', 'M (10x15 см)', 'L (13x18 см)'],
    colors: ['Белый', 'Золотой', 'Серебряный', 'Розовый', 'Голубой'],
    minOrder: 50,
    mockupTemplate: 'pouch-organza'
  },
  {
    id: '9',
    name: 'Упаковка для бутылки',
    category: 'events',
    price: 145,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
    description: 'Специальная коробка-тубус для бутылок вина и шампанского.',
    sizes: ['Стандарт (0.75л)', 'Magnum (1.5л)'],
    colors: ['Черный', 'Бордовый', 'Золотой'],
    minOrder: 15,
    mockupTemplate: 'box-bottle'
  },
  {
    id: '10',
    name: 'Крафт-коробка с окном',
    category: 'boxes',
    price: 95,
    image: 'https://images.unsplash.com/photo-1588022274146-b1e3b8c35991?w=800',
    description: 'Экологичная коробка из крафт-картона с прозрачным окном.',
    sizes: ['S (15x15x5 см)', 'M (20x20x8 см)', 'L (25x25x10 см)'],
    colors: ['Натуральный крафт'],
    minOrder: 30,
    mockupTemplate: 'box-kraft-window'
  },
  {
    id: '11',
    name: 'Ленты атласные',
    category: 'wrapping',
    price: 55,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800',
    description: 'Атласная лента шириной 2.5 см. Рулон 25 метров.',
    sizes: ['25 м'],
    colors: ['Красный', 'Синий', 'Золотой', 'Серебряный', 'Белый', 'Черный'],
    minOrder: 10,
  },
  {
    id: '12',
    name: 'Пакет для корпоративных подарков',
    category: 'events',
    price: 220,
    image: 'https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=800',
    description: 'Премиальный пакет из дизайнерской бумаги с тиснением. Подходит для корпоративных мероприятий.',
    sizes: ['M (30x40x15 см)', 'L (40x50x18 см)'],
    colors: ['Белый', 'Синий', 'Черный'],
    minOrder: 25,
    mockupTemplate: 'bag-corporate'
  },
];

export const categories = [
  { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
  { id: 'boxes', name: 'Коробки', icon: 'Box' },
  { id: 'bags', name: 'Пакеты', icon: 'ShoppingBag' },
  { id: 'pouches', name: 'Мешочки', icon: 'Package' },
  { id: 'wrapping', name: 'Упаковочная бумага', icon: 'Gift' },
  { id: 'events', name: 'Для мероприятий', icon: 'PartyPopper' },
];
