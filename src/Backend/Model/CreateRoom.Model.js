const mongoose = require("mongoose");

// create a room for the developers model
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

// export the final model
const Task = mongoose.model("Tasks", RoomCreation);
module.exports = Task;
