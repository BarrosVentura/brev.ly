import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { z } from "zod";

const getLinkInput = z.object({
  short_url: z.string(),
});

type GetLinkInput = z.input<typeof getLinkInput>;

export async function getLink(input: GetLinkInput) {
  const { short_url } = getLinkInput.parse(input);

  const link = await db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalUrl,
      shortLink: schema.links.shortUrl,
      createdAt: schema.links.createdAt,
      totalClicks: schema.links.totalClicks,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, short_url));

  const updatedLink = await db
    .update(schema.links)
    .set({
      totalClicks: link[0].totalClicks + 1,
    })
    .where(eq(schema.links.shortUrl, short_url))
    .returning();

  return updatedLink[0];
}
