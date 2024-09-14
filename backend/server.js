const express = require("express");
const app = express();
const cors = require("cors");
const port = 5050;
const mongoose = require("mongoose");
const config = require("./db");
const adminRoute = require("./admin/admin.route");
const CityRouter = require("./admin/city.router");
const StateRouter = require("./admin/state.router");
const EventRouter = require("./admin/event.router");
const UserRouter = require("./user/user.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use("/city", CityRouter);
app.use("/state", StateRouter);
app.use("/event", EventRouter);
app.use("/user", UserRouter);

mongoose
  .connect(config.URL)
  .then(() => {
    console.log("Connected to database", config.URL);
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
