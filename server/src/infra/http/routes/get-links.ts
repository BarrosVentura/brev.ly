import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get all links",
        tags: ["links"],
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                complete_url: z.string(),
                short_url: z.string(),
                total_clicks: z.number(),
                created_at: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.status(200).send({
        links: [
          {
            complete_url: "teste",
            created_at: new Date(),
            id: "1",
            short_url: "teste",
            total_clicks: 0,
          },
        ],
      });
    }
  );
};
