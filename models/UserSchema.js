var { Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    gender: String,
    phone: Number
});

module.exports = model('User', UserSchema);