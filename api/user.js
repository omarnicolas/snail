"use strict";

const { Router } = require("express");
const passport = require("passport");
const { NotFound, BadRequest } = require("@snail/errors");
const { getLogger, cache } = require("@snail/utils");
const { User } = require("@snail/db");
const auth = require("./auth");

const log = getLogger(__dirname, __filename);
const router = new Router();

// Save an user
router.post("/", auth.optional, async function postUser(req, res, next) {
  try {
    const { body } = req;
    const { username, email, password } = body;

    if (!username) {
      next(new BadRequest("username is required"));
      return;
    }

    if (!email) {
      next(new BadRequest("email is required"));
      return;
    }

    if (!password) {
      next(new BadRequest("password is required"));
      return;
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.setPassword(password);

    res.send(
      await user.save().then(function() {
        res.send(user.toAuthJSON());
      })
    );
    cache.del("user");
  } catch (err) {
    next(err);
  }
});

// Login an user
router.post("/login", auth.optional, async function loginUser(req, res, next) {
  try {
    const { body } = req;
    const { email, password } = body;

    if (!email) {
      next(new BadRequest("email is required"));
      return;
    }

    if (!password) {
      next(new BadRequest("password is required"));
      return;
    }

    return passport.authenticate("local", { session: false }, function(
      err,
      passportUser,
      info
    ) {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  } catch (err) {
    next(err);
  }
});

// Get an user
router.get("/:userId", auth.required, async function getUser(req, res, next) {
  try {
    const { id, params } = req;
    const { userId } = params;

    if (!cache.has(userId)) {
      log.info({ id, message: `fetching user:${userId} from db` });
      const user = await User.findById(userId);
      if (!user) {
        next(new NotFound(`Can't find user with id ${userId}`));
        return;
      }
      cache.set(userId, user.toAuthJSON());
      res.send(user.toAuthJSON());
    }
  } catch (err) {
    next(err);
  }
});

// Delete an user
router.delete("/:userId", async function deleteUser(req, res, next) {
  try {
    const { id, params } = req;
    const { userId } = params;

    log.info({ id, message: `Deleting user:${userId} from db` });
    const user = await User.findByIdAndRemove(userId);
    res.send(`Deleted successfully`);
    cache.del("user");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
