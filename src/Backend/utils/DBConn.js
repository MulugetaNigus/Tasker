// import the mongoose package
const mongoose = require("mongoose");

// as well as import the dotenv to work with env variables
require("dotenv").config();

// the main db connection function
const DBConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then( () => {
        console.log("DB Connected !");
    }) .catch( (err) => {
        console.log(err.message);
    })
};

// export the db fun for letter usage
module.exports =  DBConnection;
