const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Client, Room, RoomUsage } = require("../models/index");
class Controller {
  static async registerUser(req, res) {
    try {
      const { email, password, name } = req.body;

      const data = await User.create({ email, password, name });
      res.status(201).json({
        id: data.id,
        email: data.email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "FIELD_UNCOMPLETE" };
      }

      let findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }

      const isValidPassword = comparePassword(password, findUser.password);
      if (!isValidPassword) {
        throw { name: "USER_NOT_FOUND" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        email: payload.email,
        id: payload.id,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "USER_NOT_FOUND") {
        res.status(401).json("Invalid Email / Password");
      } else if (error.name === "FIELD_UNCOMPLETE") {
        res.status(402).json("Please Fill All Field!");
      } else {
        console.log(error);
      }
    }
  }
}

module.exports = Controller;
