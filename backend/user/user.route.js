const express = require("express");
const UserRoute = express.Router();
const bodyparser = require("body-parser");
const User = require("./user.model");
const fs = require("fs");
const multer = require("multer");

UserRoute.post("/regsiter", (req, res) => {
  const user = new User(req.body);
  user.save().then((cust) => {
    if (cust != null) {
      res.send("regsistration succesfully");
    } else {
      res.send("regsistration failed");
    }
  });
});

UserRoute.post("/login", (req, res) => {
  const id = req.body.USerId;
  const password = req.body.UserPass;

  User.findOne({ USerId: id, UserPass: password, UStatus: "active" })
    .then((cust) => {
      if (cust) {
        res.send(cust);
      } else {
        res.send("Invalid ID or password");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send("Something went wrong");
    });
});

UserRoute.get("/getimage/:UPicName", (req, res) => {
  const picname = req.params.UPicName;
  res.sendFile(
    "E:/project_hackathon/Event-Management-System/backend/User/Userimages/" +
      picname
  );
});

const stv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "E:/project_hackathon/Event-Management-System/backend/User/Userimages/"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: stv });

UserRoute.post("/saveUserimage", uploads.single("file"), (req, res) => {
  res.send("file upload successfully ");
});
UserRoute.get("/getUsercount", (req, res) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});
UserRoute.get("/getUserdeatils/:Uid", (req, res) => {
  const id = req.params.Uid;
  console.log(id);
  User.findOne({ Uid: id })
    .then((user) => {
      // console.log(user)
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});
UserRoute.get("/getUsercount", (req, res) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});
UserRoute.put("/toggle", (req, res) => {
  const { Uid, UStatus } = req.body;

  User.updateOne({ Uid: Uid }, { UStatus: UStatus })
    .then((result) => {
      console.log("Update result:", result);
      res.send("State updated successfully");
    })
    .catch((err) => {
      console.error("Update error:", err);
      res.status(500).send(err);
    });
});

module.exports = UserRoute;
