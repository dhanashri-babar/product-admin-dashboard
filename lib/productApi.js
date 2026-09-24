import api from "./api";

export async function login(username, password) {
  const { data } = await api.post("/auth/login", { username, password });
  return data;
}

export async function getProducts(params, signal) {
  const { data } = await api.get("/products", { params, signal });
  return data;
}

export async function searchProducts(query, params, signal) {
  const { data } = await api.get("/products/search", {
    params: { q: query, ...params },
    signal
  });
  return data;
}

export async function getCategories(signal) {
  const { data } = await api.get("/products/categories", { signal });
  return data;
}

export async function getProduct(id, signal) {
  const { data } = await api.get(`/products/${id}`, { signal });
  return data;
}

export async function addProduct(product) {
  const { data } = await api.post("/products/add", product);
  return data;
}

export async function updateProduct(id, product) {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}