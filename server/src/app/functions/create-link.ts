import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";

const createLinkInput = z.object({
  originalLink: z.string().url(),
  shortLink: z.string(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

export async function createLink(input: CreateLinkInput) {
  const { originalLink, shortLink } = createLinkInput.parse(input);

  await db.insert(schema.links).values({
    originalUrl: originalLink,
    shortUrl: shortLink,
  });
}
