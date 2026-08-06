import type { Categoria, Producto } from "@/types/catalog";
import { CATEGORIAS_MOCK, PRODUCTOS_MOCK } from "@/data/catalog.mock";

/**
 * Capa de servicios del catálogo.
 *
 * Hoy devuelve datos de ejemplo. Para conectar el backend (Spring Boot / API REST)
 * basta con definir VITE_API_URL y reemplazar el cuerpo de cada función por el
 * fetch correspondiente — la firma pública no cambia.
 *
 *   GET  /api/categorias
 *   GET  /api/productos
 *   GET  /api/productos?destacado=true
 *   GET  /api/productos/{id}
 */
const API_URL = import.meta.env["VITE_API_URL"] as string | undefined;

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Error ${res.status} al consultar ${path}`);
  return (await res.json()) as T;
}

export async function getCategorias(): Promise<Categoria[]> {
  if (API_URL) return apiGet<Categoria[]>("/api/categorias");
  return CATEGORIAS_MOCK;
}

export async function getProductos(): Promise<Producto[]> {
  if (API_URL) return apiGet<Producto[]>("/api/productos");
  return PRODUCTOS_MOCK.filter((p) => p.disponible);
}

export async function getProductosDestacados(): Promise<Producto[]> {
  if (API_URL) return apiGet<Producto[]>("/api/productos?destacado=true");
  return PRODUCTOS_MOCK.filter((p) => p.disponible && p.destacado);
}

export async function getProductoPorId(id: string): Promise<Producto | undefined> {
  if (API_URL) return apiGet<Producto>(`/api/productos/${id}`);
  return PRODUCTOS_MOCK.find((p) => p.id === id);
}

/** Query keys reutilizables para TanStack Query. */
export const catalogKeys = {
  categorias: ["categorias"] as const,
  productos: ["productos"] as const,
  destacados: ["productos", "destacados"] as const,
};
