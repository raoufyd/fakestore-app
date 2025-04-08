export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductCreate = Omit<Product, "id" | "rating"> & {
  rating?: {
    rate: number;
    count: number;
  };
};
