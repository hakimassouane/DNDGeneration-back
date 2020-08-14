let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const raceSchema = new Schema({
    _id: ObjectId,
    raceId: Number,
    raceName: String,
    raceDescription: String,
});

module.exports = raceSchema;