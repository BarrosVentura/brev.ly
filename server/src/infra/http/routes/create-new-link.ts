import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createNewLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a new link",
        tags: ["links"],
        body: {
          originalLink: z.string(),
          shortLink: z.string(),
        },
        response: {
          201: z.object({
            id: z.string(),
            original_url: z.string(),
            short_url: z.string(),
            created_at: z.date(),
            total_clicks: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({
        id: "1",
        original_url: "teste",
        short_url: "teste",
        created_at: new Date(),
        total_clicks: 0,
      });
    }
  );
};
