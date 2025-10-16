import { useQuery } from "@tanstack/react-query";
import type {
  HomeResponse,
  NavigationResponse,
  PageResponse,
} from "@shared/api";

async function getJSON<T>(path: string): Promise<T> {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      console.warn(`Request to ${path} failed with status ${res.status}`);
      // fallthrough to return safe default below
    } else {
      return (await res.json()) as T;
    }
  } catch (err) {
    console.warn(`Request to ${path} failed:`, err);
  }

  // Provide safe defaults to avoid noisy console errors and broken UI
  if (path.includes("/api/navigation")) {
    return ({ brand: { name: "The Applique" }, links: [] } as unknown) as T;
  }
  if (path.includes("/api/home")) {
    return ({ hero: [], collections: [], featured: [], banners: [], instagram: [] } as unknown) as T;
  }
  if (path.includes("/api/pages")) {
    const slug = path.split("/").pop() || "page";
    return ({ slug, title: "", content: "" } as unknown) as T;
  }

  // generic fallback
  return ({} as unknown) as T;
}

export function useNavigation() {
  return useQuery({ queryKey: ["navigation"], queryFn: () => getJSON<NavigationResponse>("/api/navigation") });
}

export function useHome() {
  return useQuery({ queryKey: ["home"], queryFn: () => getJSON<HomeResponse>("/api/home") });
}

export function usePage(slug: string) {
  return useQuery({ queryKey: ["page", slug], queryFn: () => getJSON<PageResponse>(`/api/pages/${slug}`) });
}

export function useCollection(id: string | undefined) {
  return useQuery({ queryKey: ["collection", id], queryFn: () => getJSON<{ id: string; products: { id: string; title: string; imageUrl: string }[] }>(`/api/collections/${id}`), enabled: !!id });
}
