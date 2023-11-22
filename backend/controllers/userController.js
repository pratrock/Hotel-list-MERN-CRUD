const User = require("../models/User.js");
/* const Users = require("../models/User.js"); */
const jwt = require("jsonwebtoken");
const userController = {
  verifyToken: (req, res, next) => {
    if (!req.header.authorization) {
      return res.status(401).send("unauthorized request");
    } else {
      let token = req.header.authorization.split(" ")[1];
      if (token === "null") {
        return res.status(401).send("unauthorized request");
      }
      jwt.verify(token, "secretKey", (err, payload) => {
        if (payload) {
          req.userId = payload.subject;
          next();
        } else {
          return res.status(401).send("unauthorized request");
        }
      });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const name = `${firstName} ${lastName}`;
      const newUser = new User({
        email,
        password,
        name: name,
      });

      const registeredUser = await newUser.save();
      let payload = await { subject: registeredUser._id };
      let token = await jwt.sign(payload, "secretKey");
      console.log(payload, token);
      res.status(201).send({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  loginUser: async (req, res) => {
    let { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        if (user.password !== password) {
          res.status(401).send("Invalid password");
        } else {
          let payload = await { subject: user._id };
          let token = await jwt.sign(payload, "secretKey");
          res.status(201).send({ token });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = userController;
