import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLink: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links",
    {
      schema: {
        summary: "Delete a link",
        tags: ["links"],
        body: {
          link_id: z.string(),
        },
        response: {
          200: z.undefined(),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send();
    }
  );
};
