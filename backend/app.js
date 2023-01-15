const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controller/controller");
const loginAuth = require("./middlewares/authentication");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", Controller.registerUser);
app.post("/login", Controller.loginUser);

app.use(loginAuth);

app.post("/client/add", Controller.addClient);
app.post("/client/addBalance/:id", Controller.addClientCredit);
app.get("/client/", Controller.getClients);
app.get("/client/:id", Controller.getClient);

app.post("/room/add", Controller.addRoom)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
