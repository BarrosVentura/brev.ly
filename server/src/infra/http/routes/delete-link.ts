import { deleteLink } from "@/app/functions/delete-link";
import { GenericError } from "@/app/functions/errors/generic-error";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a link",
        tags: ["links"],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.undefined(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        await deleteLink({ link_id: id });

        return reply.status(200).send();
      } catch (error) {
        if (
          error instanceof GenericError &&
          error.message === "Link not found"
        ) {
          return reply.status(404).send({
            message: "Elemento não existe",
          });
        }

        throw error;
      }
    }
  );
};
