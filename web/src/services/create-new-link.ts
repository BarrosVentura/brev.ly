import { api } from "@/lib/axios";

export function createNewLink({
  originalLink,
  shortLink,
}: {
  originalLink: string;
  shortLink: string;
}) {
  return api.post("/links", {
    originalLink,
    shortLink,
  });
}
