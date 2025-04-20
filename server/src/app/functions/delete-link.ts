import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, ilike } from "drizzle-orm";
import { z } from "zod";
import { GenericError } from "./errors/generic-error";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";

const deleteLinkInput = z.object({
  link_id: z.string().uuid(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<GenericError, { message: string }>> {
  const { link_id } = deleteLinkInput.parse(input);
  const table = schema.links;

  const result = await db
    .delete(table)
    .where(eq(table.id, link_id))
    .returning();

  if (result.length === 0) {
    return makeLeft(new GenericError("Link not found"));
  }

  return makeRight({ message: "Link deletado" });
}
