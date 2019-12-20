const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require(`jsonwebtoken`);

const userBodyValidation = require(`../api/middleware/user-body-validation`);

const Users = require(`../database/models/users-model`);

const signToken = payload => {
  return jwt.sign(payload, process.env.secret, {
    expiresIn: "1h"
  });
};

router.post(
  "/register",
  userBodyValidation([`username`, `password`]),
  (req, res) => {
    // implement registration

    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const token = signToken({ username: username });

    Users.add({ username, password: hash })
      .then(saved => {
        res.status(201).json({ token, saved });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

router.post(
  "/login",
  userBodyValidation([`username`, `password`]),
  (req, res) => {
    // implement login
    let { username, password } = req.body;

    Users.find(username)
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = signToken({ username: user.username });
          res.status(200).json({ token, message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
);

module.exports = router;
