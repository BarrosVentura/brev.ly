import { Link } from "@/DTO/link";
import { api } from "@/lib/axios";

export function getLink(shortLink: string) {
  return api.get<Link>(`links/${shortLink}`);
}
