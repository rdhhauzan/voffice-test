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

  static async addClient(req, res) {
    try {
      const { name, email, phone, credit } = req.body;

      if (!name || !email || !phone || !credit) {
        throw { name: "FIELD_UNCOMPLETE" };
      }

      let data = await Client.create({ name, email, phone, credit });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      if (error.name == "FIELD_UNCOMPLETE") {
        res.status(401).json("Please Fill all the field!");
      } else {
        res.status(500).json(error);
      }
    }
  }

  static async addClientCredit(req, res) {
    const { credit } = req.body;
    const { id } = req.params;
    try {
      let findClient = await Client.findOne({
        where: {
          id: id,
        },
      });

      if (!findClient) {
        throw { name: "CLIENT_NOT_FOUND" };
      }

      await Client.increment("credit", {
        by: credit,
        where: { id: id },
      });

      res
        .status(200)
        .json(`Success add ${credit} Credit to Client with ID ${id}`);
    } catch (error) {
      console.log(error);
      if (error.name == "CLIENT_NOT_FOUND") {
        res.status(402).json("Client Not Found");
      }
    }
  }

  static async getClients(req, res) {
    try {
      let data = await Client.findAll();

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getClient(req, res) {
    const { id } = req.params;

    try {
      let data = await Client.findOne({
        where: { id: id },
        include: [
          {
            model: RoomUsage,
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async addRoom(req, res) {
    const { roomName, costPerHour } = req.body;
    try {
      if (!roomName || !costPerHour) {
        throw { name: "FIELD_UNCOMPLETE" };
      }

      let data = await Room.create({ roomName, costPerHour });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      if (error.name == "FIELD_UNCOMPLETE") {
        res.status(401).json("Please Fill all the field!");
      } else {
        res.status(500).json(error);
      }
    }
  }
}

module.exports = Controller;
