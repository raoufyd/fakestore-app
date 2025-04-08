import type { Product, ProductCreate } from "@/types/product";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(limit?: number): Promise<Product[]> {
  const url = limit
    ? `${API_URL}/products?limit=${limit}`
    : `${API_URL}/products`;
  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  console.log("response : ", response);
  return response.json();
}

export async function getProductCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/products/categories`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products/category/${category}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }

  return response.json();
}

export async function createProduct(
  product: ProductCreate,
  token: string
): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

export async function updateProduct(
  id: number,
  product: ProductCreate,
  token: string
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}

export async function deleteProduct(
  id: number,
  token: string
): Promise<{ id: number }> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}
