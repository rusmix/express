const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    name: String,
    login: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;