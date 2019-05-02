"use strict";

const { getLogger } = require("@snail/utils");
const user = require("@snail/api/user");

const log = getLogger(__dirname, __filename);

module.exports = {
  home(req, res) {
    res.send({
      user: "/user"
    });
  },
  user,
  errorHandler(err, req, res, next) {
    if (err) {
      let code = err.code || 500;
      const { id } = req;
      const { message, stack } = err;
      log.debug({ id, message: stack });
      log.error({ id, message });
      res.status(code).send({ error: message });
      return;
    }

    next();
  }
};
