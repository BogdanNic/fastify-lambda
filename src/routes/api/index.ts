import { FastifyPluginAsync } from "fastify";

const api: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { api: "ok" };
  });
};

export default api;
