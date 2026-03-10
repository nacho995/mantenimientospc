/**
 * Capa base HTTP — Single Responsibility.
 * Solo se encarga de hacer fetch con la config base.
 * Todos los servicios concretos la usan via composición (no herencia).
 * 
 * Dependency Inversion: el resto del código depende de ApiResponse (abstracción),
 * no de fetch (detalle). Si mañana cambias a axios, solo tocas este archivo.
 */
import type { ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export async function post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Intentar extraer mensaje de error del backend
      const errorData = await response.json().catch(() => null) as { message?: string } | null;
      return {
        ok: false,
        error: errorData?.message ?? `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json() as T;
    return { ok: true, data };
  } catch (err) {
    // Error de red (no hay conexión, backend caído, CORS, etc.)
    const message = err instanceof Error ? err.message : 'Error de conexión';
    return { ok: false, error: message };
  }
}
