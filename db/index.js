"use strict";

const mongoose = require("mongoose");
const config = require("@snail/config");
const { getLogger, terminate } = require("@snail/utils");

const User = require("./models/user");

const log = getLogger(__dirname, __filename);

if (!config.db) {
  log.error("🌟  Please set MONGODB_URL env variable");
  process.exit(1);
}

mongoose.connect(config.db, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", terminate(1, "dbError"));
mongoose.connection.once("open", () => {
  log.info("🔌  Database connected");
});

module.exports = {
  User
};
