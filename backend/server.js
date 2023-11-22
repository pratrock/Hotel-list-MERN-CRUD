const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const hotels = require("./routes/hotels.js");
const users = require("./routes/users.js");
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(hotels);
app.use(users);
const db = "mongodb://localhost:27017/reservations";
mongoose.connect(db).then(() => {
  console.log("connected to db");
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
