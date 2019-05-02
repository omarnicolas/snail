"use strict";

const http = require("http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errorHandler, user, home } = require("@snail/api");
const { getLogger, logHandler, terminate } = require("@snail/utils");

require("./config/passport");

const app = express();
const server = http.createServer(app);
const log = getLogger(__dirname, __filename);
const port = +process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logHandler);
app.use("/user", user);
app.get("/", home);
app.use(errorHandler);

module.exports = server;

if (!module.parent) {
  server.listen(port, () => {
    log.info(`🚀  Server listening on http://localhost:${port}`);
  });

  process.on("SIGINT", terminate(0, "SIGINT"));
  process.on("SIGTERM", terminate(0, "SIGTERM"));
  process.on("uncaughtException", terminate(1, "uncaughtException"));
  process.on("unhandledRejection", terminate(1, "unhandledRejection"));
}
