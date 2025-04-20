import { getLinks } from "@/app/functions/get-links";
import { isRight, unwrapEither } from "@/infra/shared/either";
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
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getLinks();

      if (isRight(result)) {
        const links = result.right.map((link) => ({
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
