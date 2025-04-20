import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLeft, makeRight, type Either } from "@/infra/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { UrlAlreadySavedError } from "./errors/url-already-saved-error";

const createLinkInput = z.object({
  originalLink: z.string().url(),
  shortLink: z.string(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

export async function createLink(input: CreateLinkInput): Promise<
  Either<
    UrlAlreadySavedError,
    {
      id: string;
      originalUrl: string;
      shortUrl: string;
      createdAt: Date;
      totalClicks: number;
    }
  >
> {
  const { originalLink, shortLink } = createLinkInput.parse(input);

  const isAlreadyUsed = await db
    .select({
      shortLink: schema.links.shortUrl,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortLink));

  if (isAlreadyUsed[0]) {
    return makeLeft(new UrlAlreadySavedError("A url encurtada já existe"));
  }

  const result = await db
    .insert(schema.links)
    .values({
      originalUrl: originalLink,
      shortUrl: shortLink,
    })
    .returning();

  return makeRight(result[0]);
}
