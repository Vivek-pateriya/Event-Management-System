var mongoose = require("mongoose");
const schema = mongoose.Schema;
var Events = new schema(
  {
    eventid: { type: Number },
    eventname: { type: String },
    eventdata: { type: Date },
    eventcity: { type: String },
    eventstate: { type: String },
    status: { type: Number },
  },
  {
    collection: "Events",
  }
);
module.exports = mongoose.model("Events", Events);
