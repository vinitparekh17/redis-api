var express = require('express');
var redisClient = require('redis').createClient();
var User = require("./models/UserSchema");
var dummy = require("mongoose-dummy");
var connection = require('./utility/connection')
var app = express();
//mongo connection
connection.connect();
// connect to redis
redisClient.connect()
    .then(() => console.log("Connected to Redis"))
    .catch(err => console.log(err));

app.get('/', async (req, res) => {
    res.send('Hello World!');
})

app.get('/all', async (req, res) => {
    let allUser = await User.find({});
    let cachedUsers = await redisClient.get('users');
    if (cachedUsers) {
        console.log("Getting from cache");
        res.send(JSON.parse(cachedUsers));
    } else {
        console.log("Getting from DB");
        res.send(allUser);
        await redisClient.set('users', JSON.stringify(allUser));
    }
});

app.listen(8080, function () {
    console.log("Server started on port 8080");
});
