import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";

import {
  jsonSchemaTransform,
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createNewLinkRoute } from "@/infra/http/routes/create-new-link";
import { deleteLinkRoute } from "@/infra/http/routes/delete-link";
import { getLinksRoute } from "@/infra/http/routes/get-links";
import { getLinkRoute } from "./infra/http/routes/get-link";
import { exportLinksRoute } from "./infra/http/routes/export-links";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: "Internal server error" });
});

server.register(fastifyCors, { origin: "*", methods: "GET,POST,DELETE" });

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brev.ly",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(exportLinksRoute);
server.register(createNewLinkRoute);
server.register(deleteLinkRoute);
server.register(getLinksRoute);
server.register(getLinkRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("Server is running on http://localhost:3333");
});
