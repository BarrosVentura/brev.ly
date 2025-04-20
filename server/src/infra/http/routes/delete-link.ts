import { deleteLink } from "@/app/functions/delete-link";
import { GenericError } from "@/app/functions/errors/generic-error";
import { isRight, unwrapEither } from "@/infra/shared/either";
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

      const result = await deleteLink({ link_id: id });

      if (isRight(result)) {
        return reply.status(200).send();
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "GenericError":
          return reply.status(404).send({
            message: "Elemento não existe",
          });
      }
    }
  );
};
