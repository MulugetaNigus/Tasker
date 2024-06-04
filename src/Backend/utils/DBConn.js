const mongoose = require("mongoose");
require("dotenv").config();

const DBConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then( () => {
        console.log("DB Connected !");
    }) .catch( (err) => {
        console.log(err.message);
    })
};

module.exports =  DBConnection;