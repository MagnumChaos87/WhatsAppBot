const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  ID: {type: String, required: true},
  phoneNumber: {type: String, default: ""},
  lastAd: {type: Number, default: 0}
})

module.exports = model("Users", UserSchema);