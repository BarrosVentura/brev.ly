import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export async function getLinks() {
  const result = await db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalUrl,
      shortLink: schema.links.shortUrl,
      createdAt: schema.links.createdAt,
      totalClicks: schema.links.totalClicks,
    })
    .from(schema.links);

  return result;
}
