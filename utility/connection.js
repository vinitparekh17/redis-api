const mongoose = require("mongoose");

exports.connect = () => {
    mongoose.connect('mongodb://0.0.0.0:27017/redis', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            return console.log(err);
        }
            console.log("Successfully Connected!");
    });
}