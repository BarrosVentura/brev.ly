import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { GenericError } from "./errors/generic-error";

const getLinkInput = z.object({
  short_url: z.string(),
});

type GetLinkInput = z.input<typeof getLinkInput>;

export async function getLink(input: GetLinkInput): Promise<
  Either<
    GenericError,
    {
      id: string;
      originalUrl: string;
      shortUrl: string;
      createdAt: Date;
      totalClicks: number;
    }
  >
> {
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

  if (!link[0]) {
    return makeLeft(new GenericError("URL buscada não existe"));
  }

  const updatedLink = await db
    .update(schema.links)
    .set({
      totalClicks: link[0].totalClicks + 1,
    })
    .where(eq(schema.links.shortUrl, short_url))
    .returning();

  return makeRight(updatedLink[0]);
}
