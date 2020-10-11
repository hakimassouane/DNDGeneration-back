let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const featSchema = new Schema({
    _id: ObjectId,
    name: String,
    entries: Array,
    source: String,
    page: String

});

module.exports = featSchema;