let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const backgroundSchema = new Schema({
    _id: ObjectId,
    name: String,
    version: String,
    skillProficiencies: String,
    toolProficiencies: String,
    introduction: String,
    source: String,
    page: String
});

module.exports = backgroundSchema;