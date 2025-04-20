import { getLink } from "@/app/functions/get-link";
import { isRight, unwrapEither } from "@/infra/shared/either";
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
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { short_url } = request.params;

      const result = await getLink({ short_url });

      if (isRight(result)) {
        const link = {
          id: result.right.id,
          complete_url: result.right.originalUrl,
          short_url: result.right.shortUrl,
          total_clicks: result.right.totalClicks,
          created_at: result.right.createdAt,
        };

        return reply.status(200).send(link);
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "GenericError":
          return reply.status(404).send({
            message: error.message,
          });
      }
    }
  );
};
