import { createLink } from "@/app/functions/create-link";
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
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body;
      // console.log(teste);
      await createLink({ originalLink, shortLink });

      return reply.status(201).send();
    }
  );
};
