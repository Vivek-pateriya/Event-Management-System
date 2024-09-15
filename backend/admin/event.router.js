const express = require("express");
const eventRouter = express.Router();
var Event = require("./event.model");
//save state
eventRouter.route("/save").post((req, res) => {
  var state = new Event(req.body);
  state
    .save()
    .then((states) => {
      res.send("Event Saved");
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});
//search state
eventRouter.route("/search/:eventid").get((req, res) => {
  Event.findOne({ eventid: req.params.eventid })
    .then((state) => {
      if (state) {
        res.send(state);
      } else {
        res.send("state not found : ");
      }
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});
//updata statue
eventRouter.route("/update").put((req, res) => {
  Event.updateOne(
    { eventid: req.body.eventid },
    {
      eventid: req.body.eventid,
      eventname: req.body.eventname,
      eventdata: req.body.eventdata,
      eventcity: req.body.eventcity,
      eventstate: req.body.eventstate,
      status: req.body.status,
    }
  )
    .then((state) => {
      res.send("Status Updated");
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});
//delete enable or disable
eventRouter.route("/delete/:eventid").delete((req, res) => {
  Event.updateOne({ eventid: req.params.eventid }, { status: 0 })
    .then((state) => {
      res.send("Status Deleted");
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});

//show all user to get all data from mongodb
eventRouter.route("/show").get((req, res) => {
  Event.find({ status: 1 })
    .then((state) => {
      res.send(state);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});
//get all
eventRouter.route("/getall").get((req, res) => {
  Event.find()
    .then((states) => {
      res.status(200).send(states);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
//searchByName
eventRouter.route("/searchbyname/:stname").get((req, res) => {
  Event.findOne({ eventname: req.params.eventname })
    .then((state) => {
      res.send(state);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
});
// eventRouter.route('/togle').put((req, res) => {
//   let s = req.body.state;
//   if (s === 1) {
//     s = 0;
//   } else {
//     s = 1
//   }
//   Event.updateOne({ "eventid": req.body.eventid }, { "status": s }).then(state => {
//     res.send("Status Updated");
//     res.end();
//   }).catch((err) => {
//     res.send(err);
//     res.end();
//   });
// });
eventRouter.put("/toggle", (req, res) => {
  console.log("Request body:", req.body);
  const { Uid, UStatus } = req.body;
  console.log("UID:", uid);
  console.log("UStatus:", UStatus);

  Event.updateOne({ eventid: Uid }, { status: UStatus })
    .then((result) => {
      console.log("Update result:", result);
      if (result.modifiedCount === 0) {
        console.log("No documents were updated.");
      }
      res.send("State updated successfully");
    })
    .catch((err) => {
      console.error("Update error:", err);
      res.status(500).send(err);
    });
});

module.exports = eventRouter;
