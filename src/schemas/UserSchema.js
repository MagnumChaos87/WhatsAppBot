const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  ID: {type: String, required: true},
  phoneNumber: {type: String, default: ""},
  status: {type: String, default: ""},
  role: {type: String, default: "user"},
  lastAd: {type: Number, default: 0}
});

module.exports = model("Users", UserSchema);