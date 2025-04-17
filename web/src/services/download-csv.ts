import { api } from "@/lib/axios";

export function downloadCsv() {
  return api.post<{ reportUrl: string }>("/links/exports");
}
