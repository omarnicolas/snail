"use strict";

class Forbidden extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
    this.code = 403;
    Error.captureStackTrace(this, Forbidden);
  }
}

module.exports = Forbidden;
