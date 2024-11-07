const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  ID: {type: String, required: true},
  status: {type: String, default: ""},
  role: {type: String, default: "user"},
  session: {type: Array, default: []},
  lastAd: {type: Number, default: 0}
});

module.exports = model("Users", UserSchema);