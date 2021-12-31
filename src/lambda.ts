const awsLambdaFastify = require("aws-lambda-fastify");
import fastify from "fastify";
import app from "./app.js";
// Instantiate Fastify with some config
const server = fastify({
  logger: true,
});
server.register(app);

const proxy = awsLambdaFastify(server);
// or
// const proxy = awsLambdaFastify(server, { binaryMimeTypes: ['application/octet-stream'] })

exports.handler = proxy;
