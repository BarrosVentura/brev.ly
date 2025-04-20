import { api } from "@/lib/axios";

export function downloadCsv() {
  return api.get<{ exportUrl: string }>("/links/export");
}
