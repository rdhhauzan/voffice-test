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
app.get("/clients/", Controller.getClients);
app.get("/client/:id", Controller.getClient);

app.get("/rooms", Controller.getRooms);
app.post("/room/add", Controller.addRoom);
app.put("/room/edit/:id", Controller.updateRoom);
app.delete("/room/delete/:id", Controller.deleteRoom);
app.get("/room/:id", Controller.getRoom);

app.post("/roomUsage/add/:roomId", Controller.addRoomUsage);
app.get("/roomUsages", Controller.getRoomUsages);
app.delete("/roomUsage/delete/:roomId", Controller.deleteRoomUsage);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
