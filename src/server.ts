"use strict";
import appService from "./app.js";
// Read the .env file.
require("dotenv").config();

// Require the framework
import fastify from "fastify";

// Require library to exit fastify process, gracefully (if possible)
// const closeWithGrace = require("close-with-grace");

// Instantiate Fastify with some config
const server = fastify({
  logger: true,
});

// Register your application as a normal plugin.
server.register(appService);

// delay is the number of milliseconds for the graceful close to finish
// const closeListeners = closeWithGrace(
//   { delay: 500 },
//   async function ({ signal: any, err: any, manual: any }) {
//     if (err) {
//       app.log.error(err);
//     }
//     await app.close();
//   }
// );

server.addHook("onClose", async (instance: any, done: any) => {
  //   closeListeners.uninstall();
  done();
});

// Start listening.
server.listen(process.env.PORT || 3000, (err: any) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
