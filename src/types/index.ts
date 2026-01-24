export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  isPopular?: boolean;
}

export type Category = 'todos' | 'brasas' | 'combos' | 'bebidas';

export interface CategoryFilter {
  id: Category;
  label: string;
  icon?: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

export interface DeliveryZone {
  name: string;
  available: boolean;
}
