import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { hello: "world" };
  });

  fastify.get("/:id", async function (request, reply) {
    // const id = req.params.id;
    return { hello: "world" };
  });

  fastify.post("/", async function (request, reply) {
    // const { name, age, email } = req.body;
    return { user: [] };
  });
};

export default example;
