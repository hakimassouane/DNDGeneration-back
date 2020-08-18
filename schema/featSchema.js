let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const featSchema = new Schema({
    _id: ObjectId,
    featId: Number,
    name: String,
    featPrerequisite: String,
    featDescription: String,

});

module.exports = featSchema;