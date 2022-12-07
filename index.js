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

app.get('/mongodb', async (req, res) => {
    var allUser = await User.find();
    res.send(allUser)
    redisClient.get('users')
    .then(data => {
        if(data) {
            console.log('Data already in redis')
        } else {
            redisClient.setEx('users', 60 , JSON.stringify(allUser))
            console.log('Data saved in redis')
        }
    })
})

app.get('/redis', async (req, res) => {
    var cachedUsers = await redisClient.get('users')
    if(cachedUsers) {
    res.send(JSON.parse(cachedUsers))
    } else {
        res.send('No data in redis')
    }
})

app.listen(8080, function () {
    console.log("Server started on port 8080");
});
