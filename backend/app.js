const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controller/controller");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", Controller.registerUser);
app.post("/login", Controller.loginUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
