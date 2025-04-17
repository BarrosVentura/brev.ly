import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const downloadCSVLinks: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/exports",
    {
      schema: {
        summary: "Download links do CSV",
        tags: ["links"],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send({
        reportUrl: "teste",
      });
    }
  );
};
