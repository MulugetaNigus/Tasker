const Task = require("../Model/CreateRoom.Model");
const User = require("../Model/UserReg.model");

// add route
const addTask = async (req, res) => {
  try {
    // grab the value from the req body
    const { roomID, devName, tasks } = req.body;

    // check the value actual set
    if (!roomID || !devName || !tasks) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // unless, everything is okay save to your db
    const submitTask = await Task.create(req.body);
    if (!submitTask) {
      return res.status(400).json({ message: "task did not submitted !" });
    }
    return res.status(201).json({ message: "success", submitTask });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// get the task
const getTask = async (req, res) => {
  try {
    // unless, everything is okay save to your db
    const GetTask = await Task.find({});
    if (!GetTask) {
      return res.status(400).json({ message: "task did not get the tasks !" });
    }
    return res.status(201).json({ message: "success", GetTask });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// find and join the task area
const getDevArea = async (req, res) => {
  try {
    const ROOMID = req.query.roomID;
    const getArea = await Task.find({});
    const filterOut = getArea.filter((task) => task.roomID === ROOMID);
    if (!filterOut) {
      return res
        .status(400)
        .json({ message: `can not get the task with ID: ${ROOMID}` });
    }
    return res.status(201).json({ message: "success", filterOut });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error occured due to: " + error.message });
  }
};

// update the task
const updateTask = async (req, res) => {
  try {
    if (!req.body.tasks) {
      return res.status(400).send({ message: "fileds are required" });
    }
    const { id } = req.params;
    const updateBook = await Task.findByIdAndUpdate(id, req.body);
    if (!updateBook) {
      return res.status(400).json({ message: "can not update !" });
    }
    return res.status(200).json({ message: "success", updateBook });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// register user
const userReg = async (req, res) => {
  try {
    // get the inputs
    const { username, password } = req.body;

    // check if the username and passwords are not empty
    if (!username || !password) {
      return req.status(400).json({ message: "all feilds are required !" });
    }

    // and check if the username is not already taken
    const checkUsernameAlreadyInUse = await User.findOne({ username });
    if (checkUsernameAlreadyInUse) {
      return res.status(400).json({ message: "user already taken !" });
    }

    // otherwise register the user
    const registerUser = await User.create(req.body);

    // check if the user registation complated or not
    if (!registerUser) {
      return res.status(400).json({ message: "can not register the user !" });
    }

    // finally set the success message
    return res
      .status(200)
      .json({ message: "successfully registered !", registerUser });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// user login
const userLogin = async (req, res) => {
  try {
    // get the inputs from the user
    const { username, password } = req.body;

    // find the user based on the user username
    const findUser = await User.findOne({ username });

    // check if the user exist or not
    if (findUser) {
      if (findUser.password === password) {
        return res.status(200).json({ message: "success" });
      } else {
        return res
          .status(200)
          .json({ message: "Xpassword" });
      }
    } else {
      return res.status(400).json({ message: "user not found !" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addTask,
  getTask,
  getDevArea,
  updateTask,
  userReg,
  userLogin,
};
