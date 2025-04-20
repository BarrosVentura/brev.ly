import { exportLinks } from "@/app/functions/export-links";
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
            description: z.string(),
            exportUrl: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        // Chama a função exportLinks e conecta o pipeline ao reply
        const result = await exportLinks();
        return reply.status(200).send();
      } catch (error) {
        console.error("Erro ao exportar links:", error);
        return reply.status(500).send({ message: "Erro ao exportar links" });
      }
    }
  );
};
