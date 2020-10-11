let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const raceSchema = new Schema({
    _id: ObjectId,
    name: String,
    size: String,
    speedWalking: String,
    speedBurrowing: String,
    speedClimbing: String,
    speedFlying: String,
    speedSwimming: String,
    description: String,
    source: String,
    page: String
});

module.exports = raceSchema;