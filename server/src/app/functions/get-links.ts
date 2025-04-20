import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { GenericError } from "./errors/generic-error";

export async function getLinks(): Promise<
  Either<
    GenericError,
    Array<{
      id: string;
      originalLink: string;
      shortLink: string;
      createdAt: Date;
      totalClicks: number;
    }>
  >
> {
  const result = await db
    .select({
      id: schema.links.id,
      originalLink: schema.links.originalUrl,
      shortLink: schema.links.shortUrl,
      createdAt: schema.links.createdAt,
      totalClicks: schema.links.totalClicks,
    })
    .from(schema.links);

  return makeRight(result);
}
