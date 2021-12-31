import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { userSchema } from "../../../models/User";

interface Params {
  id: number;
}
type User = FromSchema<typeof userSchema>;

const Users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  let arr: User[] = [];

  const findAll: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          users: {
            type: "array",
          },
        },
      },
    },
  };

  const findUser: RouteShorthandOptions = {
    schema: {
      params: {
        id: { type: "string" },
      },
      response: {
        200: {
          user: userSchema,
        },
      },
    },
  };

  const createUsers: RouteShorthandOptions = {
    schema: {
      body: {
        user: userSchema,
      },
      response: {
        201: {
          user: {
            user: userSchema,
          },
        },
      },
    },
  };

  fastify.decorate("total", (a: number, b: number) => a + b);

  fastify.get("/", findAll, async function (request, reply) {
    return { users: arr };
  });

  fastify.get<{ Params: Params }>(
    "/:id",
    findUser,
    async function (req, replay) {
      const id = req.params.id - 1;

      if (arr && arr[id]) {
        return { user: arr[id] };
      }
      throw Error("user not found");
    }
  );

  fastify.delete<{ Params: Params }>(
    "/:id",
    findUser,
    async function (req, replay) {
      const id = req.params.id - 1;
      if (arr && arr[id]) {
        arr = arr.filter((user, index) => {
          if (index != id) {
            return user;
          }
        });
        return { user: arr[id] };
      }
      throw Error("user not found");
    }
  );

  fastify.post<{ Body: User }>("/", createUsers, async (req, reply) => {
    reply.status(201);
    const { name, age, email } = req.body;
    arr.push({ name, age, email });
    return { user: { name, age, email } };
  });
};

export default Users;
