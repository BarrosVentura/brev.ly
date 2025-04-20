import { exportLinks } from "@/app/functions/export-links";
import { isRight } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/export",
    {
      schema: {
        summary: "Export links as CSV",
        tags: ["links"],
        response: {
          200: z.object({
            exportUrl: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinks();

      if (isRight(result)) {
        return reply.status(200).send({
          exportUrl: result.right.exportedUrl,
        });
      }

      return reply.status(500).send({
        message: "Erro ao exportar links",
      });
    }
  );
};
