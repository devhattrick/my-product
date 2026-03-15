export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  price: number;
  summary: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ShopProfile = {
  brandName: string;
  heroTitle: string;
  heroDescription: string;
  lineUrl: string;
};

export type CatalogSnapshot = {
  shop: ShopProfile;
  categories: Category[];
  products: Product[];
};

export type ProductMutationInput = {
  sku: string;
  name: string;
  categoryName: string;
  price: number;
  summary: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  featured: boolean;
};
