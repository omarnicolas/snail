"use strict";

const NotFound = require("./not-found");
const BadRequest = require("./bad-request");
const Forbidden = require("./forbidden");
const Unauthorized = require("./unauthorized");

module.exports = {
  NotFound,
  BadRequest,
  Forbidden,
  Unauthorized
};
