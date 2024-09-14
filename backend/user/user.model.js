const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    USerId: { type: String },
    UserPass: { type: String },
    UserName: { type: String },
    StId: { type: Number },
    CtId: { type: Number },
    UAddress: { type: String },
    UEmail: { type: String },
    UConatct: { type: Number },
    UPicName: { type: String },
    Uid: { type: Number },
    UStatus: { type: String },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("User", User);
