import { getLinks } from "@/app/functions/get-links";
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
      const result = await getLinks();

      const links = result.map((link) => ({
        id: link.id,
        complete_url: link.originalLink,
        short_url: link.shortLink,
        total_clicks: link.totalClicks,
        created_at: link.createdAt,
      }));

      return reply.status(200).send({
        links,
      });
    }
  );
};
