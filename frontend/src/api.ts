const API_HOST = "https://api.pcpartradar.com";

export type Product = {
  id: string;
  name: string;
  current_price: number;
  currency: string;
  lastChecked: string;
  retailer: string;
  url: string;
};

export type ProductList = {
  items: Product[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export type PriceHistory = {
  id: string;
  product: string;
  price: number;
  created: string;
};

export type PriceHistoryList = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: PriceHistory[];
};

export async function fetchAPI<T>(endpoint: string, method: string = "GET", body?: BodyInit): Promise<T> {
  const res = await fetch(`${API_HOST}/api/${endpoint}`, {
    method,
    body
  });

  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  return res.json();
}

export async function checkAPI(): Promise<boolean> {
  try {
    const response = await fetch(`${API_HOST}/api/health`);
    return response.ok;
  } catch (e) {
    return false;
  }
}

export async function fetchProducts(): Promise<ProductList> {
  return await fetchAPI<ProductList>("collections/products/records");
}

export async function fetchProduct(id: string): Promise<Product> {
  return await fetchAPI<Product>("collections/products/records/" + id);
}

export async function fetchPriceHistory(
  productId: string
): Promise<PriceHistoryList> {
  return fetchAPI<PriceHistoryList>(
    `collections/price_history/records?filter=(product='${productId}')&fields=id,product,price,created&sort=-created`
  );
}

