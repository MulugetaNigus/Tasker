const mongoose = require("mongoose");

const RoomCreation = mongoose.Schema({
  roomID: {
    type: String,
    required: true,
  },
  devName: {
    type: String,
    required: true,
  },
  techStack: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: String,
      required: true,
    },
  ],
});

const Task = mongoose.model("Tasks", RoomCreation);
module.exports = Task;
