"use strict";

class Unauthorized extends Error {
  constructor(...args) {
    super(...args);
    this.name = this.constructor.name;
    this.code = 401;
    Error.captureStackTrace(this, Unauthorized);
  }
}

module.exports = Unauthorized;
