import { createLink } from "@/app/functions/create-link";
import { isRight, unwrapEither } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createNewLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a new link",
        tags: ["links"],
        body: z.object({
          originalLink: z.string(),
          shortLink: z.string(),
        }),
        response: {
          201: z.null().describe("Link created"),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body;

      const result = await createLink({ originalLink, shortLink });

      if (isRight(result)) {
        return reply.status(201).send();
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "UrlAlreadySavedError":
          return reply
            .status(400)
            .send({ message: "A URL encurtada já existe" });
      }
    }
  );
};
