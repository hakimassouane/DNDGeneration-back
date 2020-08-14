let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    _id: ObjectId,
    userName: String,
    userEmail: String,
    userPassword: String
});

module.exports = userSchema;