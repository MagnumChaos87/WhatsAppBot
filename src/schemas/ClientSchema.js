const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  ID: {type: String, required: true},
  commands: {type: Array, default: []},
  prefix: {type: String, default: "!"}
});

module.exports = model("Clients", ClientSchema);