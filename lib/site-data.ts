import type { Locale } from './i18n';

export type Category = {
  slug: string;
  name: Record<Locale, string>;
  icon: string;
};

export type Listing = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number;
  currency: string;
  category: string;
  city: string;
  region: string;
  condition: string;
  status: 'active' | 'sold' | 'paused';
  isFeatured?: boolean;
  isFree?: boolean;
  isNegotiable?: boolean;
  views: number;
  seller: { id: string; name: string; verified: boolean; avatar: string };
  images: string[];
  tags: string[];
};

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: string;
  date: string;
  image: string;
};

export const categories: Category[] = [
  { slug: 'electronics', name: { en: 'Electronics', tr: 'Elektronik', el: 'Ηλεκτρονικά', ru: 'Электроника' }, icon: 'smartphone' },
  { slug: 'furniture', name: { en: 'Furniture', tr: 'Mobilya', el: 'Έπιπλα', ru: 'Мебель' }, icon: 'armchair' },
  { slug: 'clothing', name: { en: 'Clothing', tr: 'Giyim', el: 'Ρούχα', ru: 'Одежда' }, icon: 'shirt' },
  { slug: 'vehicles', name: { en: 'Vehicles', tr: 'Araçlar', el: 'Οχήματα', ru: 'Транспорт' }, icon: 'car-front' },
  { slug: 'home', name: { en: 'Home', tr: 'Ev', el: 'Σπίτι', ru: 'Дом' }, icon: 'house' },
  { slug: 'books', name: { en: 'Books', tr: 'Kitaplar', el: 'Βιβλία', ru: 'Книги' }, icon: 'book-open' },
  { slug: 'sports', name: { en: 'Sports', tr: 'Spor', el: 'Αθλητισμός', ru: 'Спорт' }, icon: 'dumbbell' },
  { slug: 'toys', name: { en: 'Toys', tr: 'Oyuncak', el: 'Παιχνίδια', ru: 'Игрушки' }, icon: 'puzzle' },
  { slug: 'food', name: { en: 'Food', tr: 'Yiyecek', el: 'Τρόφιμα', ru: 'Еда' }, icon: 'concierge-bell' },
  { slug: 'services', name: { en: 'Services', tr: 'Hizmetler', el: 'Υπηρεσίες', ru: 'Услуги' }, icon: 'wrench-screwdriver' },
  { slug: 'pets', name: { en: 'Pets', tr: 'Evcil Hayvan', el: 'Κατοικίδια', ru: 'Питомцы' }, icon: 'paw-print' },
  { slug: 'property', name: { en: 'Property', tr: 'Gayrimenkul', el: 'Ακίνητα', ru: 'Недвижимость' }, icon: 'building-2' },
  { slug: 'events', name: { en: 'Events', tr: 'Etkinlikler', el: 'Εκδηλώσεις', ru: 'События' }, icon: 'calendar-days' },
];

export const listings: Listing[] = [
  {
    id: 'vintage-cider-press',
    title: { en: 'Vintage Cast Iron Apple Cider Press', tr: 'Vintage Dökme Demir Elma Presi', el: 'Βαρύς Παραδοσιακός Μηχανισμός Μήλου', ru: 'Винтажный чугунный пресс для яблок' },
    description: { en: 'Authentic 1940s cider press in remarkable working condition. Solid oak slats and cast iron screw mechanism.', tr: '1940’lardan kalma, çalışır durumda özgün bir pres. Meşe çıtalar ve dökme demir mekanizma.', el: 'Αυθεντικό πιεστήριο μήλων του 1940 σε άριστη κατάσταση.', ru: 'Оригинальный пресс 1940-х годов в рабочем состоянии с дубовыми рейками и чугунным механизмом.' },
    price: 425,
    currency: 'USD',
    category: 'tools',
    city: 'Somerset',
    region: 'United Kingdom',
    condition: 'Excellent',
    status: 'active',
    views: 1442,
    seller: { id: 'arthur-finch', name: 'Arthur Finch', verified: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop' },
    images: ['https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=1600&q=80&auto=format&fit=crop', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&q=80&auto=format&fit=crop', 'https://images.unsplash.com/photo-1472145246862-b24cf25c1a49?w=1200&q=80&auto=format&fit=crop'],
    tags: ['#homestead', '#vintage', '#ciderpress'],
  },
  {
    id: 'heirloom-tomatoes',
    title: { en: 'Organic Heirloom Tomatoes', tr: 'Organik Miras Domatesleri', el: 'Βιολογικές Παλιές Ντομάτες', ru: 'Органические томаты наследия' },
    description: { en: 'Freshly harvested bright red heirloom tomatoes in a handmade wooden bowl.', tr: 'Yeni hasat, canlı kırmızı domatesler.', el: 'Φρέσκες κόκκινες ντομάτες.', ru: 'Свежесобранные ярко-красные помидоры.' },
    price: 8.5,
    currency: 'USD',
    category: 'food',
    city: 'Kyrenia',
    region: 'Northern Cyprus',
    condition: 'Fresh',
    status: 'active',
    isNegotiable: true,
    views: 432,
    seller: { id: 'green-valley-farm', name: 'Green Valley Farm', verified: true, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop' },
    images: ['https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80&auto=format&fit=crop'],
    tags: ['organic', 'local', 'seasonal'],
  },
  {
    id: 'wildflower-honey',
    title: { en: 'Raw Wildflower Honey', tr: 'Çiğ Çiçek Balı', el: 'Αγνό Μέλι Άγριων Ανθέων', ru: 'Натуральный цветочный мёд' },
    description: { en: 'Golden honey with a wooden dipper and rustic jar.', tr: 'Ahşap kepçeli altın rengi bal.', el: 'Χρυσό μέλι σε βαζάκι.', ru: 'Золотистый мёд в банке с деревянной ложкой.' },
    price: 12,
    currency: 'USD',
    category: 'food',
    city: 'Nicosia',
    region: 'Cyprus',
    condition: 'Fresh',
    status: 'active',
    views: 1024,
    seller: { id: 'honey-jar', name: 'The Honey Jar', verified: false, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop' },
    images: ['https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop'],
    tags: ['honey', 'pantry', 'local'],
  },
  {
    id: 'farmall-tractor',
    title: { en: '1952 Farmall Tractor', tr: '1952 Farmall Traktör', el: 'Τρακτέρ Farmall 1952', ru: 'Трактор Farmall 1952' },
    description: { en: 'Restored classic tractor with documented service history.', tr: 'Belgeli servis geçmişi olan restore edilmiş klasik traktör.', el: 'Ανακαινισμένο κλασικό τρακτέρ.', ru: 'Отреставрированный классический трактор с историей обслуживания.' },
    price: 2400,
    currency: 'USD',
    category: 'vehicles',
    city: 'Limassol',
    region: 'South Cyprus',
    condition: 'Restored',
    status: 'active',
    isFeatured: true,
    views: 855,
    seller: { id: 'heritage-harvest', name: 'Heritage Harvest Farms', verified: true, avatar: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&q=80&auto=format&fit=crop' },
    images: ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80&auto=format&fit=crop'],
    tags: ['tractor', 'restored', 'equipment'],
  },
  {
    id: 'oak-stool',
    title: { en: 'Hand-carved Oak Stool', tr: 'El Oyma Meşe Tabure', el: 'Χειροποίητο Σκαμπό Δρυός', ru: 'Ручной дубовый табурет' },
    description: { en: 'Minimalist wooden stool with elegant grain patterns.', tr: 'Zarif dokulu minimal tabure.', el: 'Μινιμαλιστικό ξύλινο σκαμπό.', ru: 'Минималистичный деревянный табурет.' },
    price: 245,
    currency: 'USD',
    category: 'furniture',
    city: 'Petaluma',
    region: 'CA',
    condition: 'New',
    status: 'active',
    views: 1254,
    seller: { id: 'oak-iron', name: 'Oak & Iron Studio', verified: true, avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80&auto=format&fit=crop' },
    images: ['https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1200&q=80&auto=format&fit=crop'],
    tags: ['furniture', 'handmade', 'oak'],
  },
  {
    id: 'sourdough',
    title: { en: 'Local Sourdough', tr: 'Yerel Ekşi Mayalı Ekmek', el: 'Τοπικό Προζυμένιο Ψωμί', ru: 'Локальный заквасочный хлеб' },
    description: { en: '48-hour fermentation, wild yeast starter from the coastal mountains.', tr: '48 saatlik fermantasyon.', el: '48ωρη ζύμωση.', ru: '48-часовая ферментация.' },
    price: 12,
    currency: 'USD',
    category: 'food',
    city: 'Napa Valley',
    region: 'Cyprus',
    condition: 'Fresh',
    status: 'active',
    views: 678,
    seller: { id: 'wild-yeast', name: 'Wild Yeast Bakery', verified: true, avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80&auto=format&fit=crop' },
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80&auto=format&fit=crop'],
    tags: ['bakery', 'bread', 'fresh daily'],
  },
  {
    id: 'property-villa',
    title: { en: 'Azure Sanctuary Villa', tr: 'Azure Sığınak Villa', el: 'Βίλα Γαλάζιο Καταφύγιο', ru: 'Вилла Azure Sanctuary' },
    description: { en: 'Boutique coastal villa with pool and sunset views.', tr: 'Havuzlu sahil villası.', el: 'Παραθαλάσσια βίλα.', ru: 'Прибрежная вилла с бассейном.' },
    price: 4250000,
    currency: 'USD',
    category: 'property',
    city: 'Ostra Bay North',
    region: 'Cyprus',
    condition: 'Excellent',
    status: 'active',
    isFeatured: true,
    views: 2341,
    seller: { id: 'agrarian-estates', name: 'The Agrarian Estates', verified: true, avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80&auto=format&fit=crop' },
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop'],
    tags: ['property', 'pool', 'coast'],
  },
];

export const featuredListings = listings.filter((item) => item.isFeatured ?? false);

export const sellerStats = [
  { label: 'Total Listings', value: '24', delta: '+3 this week', icon: 'package' },
  { label: 'Total Views', value: '12,482', delta: '+15% last month', icon: 'eye' },
  { label: 'Saved by Others', value: '846', delta: '+8% last month', icon: 'bookmark' },
  { label: 'Unread Messages', value: '03', delta: 'Action required', icon: 'mail' },
];

export const buyerStats = [
  { label: 'Saved Listings', value: '12', delta: '+2 new', icon: 'bookmark' },
  { label: 'Unread Messages', value: '2', delta: 'From sellers', icon: 'messages-square' },
  { label: 'Recently Viewed', value: '5', delta: 'Tonight', icon: 'eye' },
];

