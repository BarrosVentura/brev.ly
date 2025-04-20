import { Link } from "@/DTO/link";
import { api } from "@/lib/axios";

export function getLinks() {
  return api.get<{
    links: Link[];
  }>("/links");
}
