export type ProductFormValues = {
  sku: string;
  name: string;
  categoryName: string;
  price: string;
  summary: string;
  description: string;
  imageUrl: string;
  highlights: string;
  featured: boolean;
};

export const emptyProductFormValues: ProductFormValues = {
  sku: "",
  name: "",
  categoryName: "",
  price: "",
  summary: "",
  description: "",
  imageUrl: "",
  highlights: "",
  featured: false,
};
