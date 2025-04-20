import { getLink } from "@/app/functions/get-link";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/:short_url",
    {
      schema: {
        summary: "Get a single link",
        tags: ["links"],
        params: z.object({
          short_url: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            complete_url: z.string(),
            short_url: z.string(),
            total_clicks: z.number(),
            created_at: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { short_url } = request.params;

      const result = await getLink({ short_url });

      const link = {
        id: result.id,
        complete_url: result.originalUrl,
        short_url: result.shortUrl,
        total_clicks: result.totalClicks,
        created_at: result.createdAt,
      };

      return reply.status(200).send(link);
    }
  );
};
