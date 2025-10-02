const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  room: String,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
