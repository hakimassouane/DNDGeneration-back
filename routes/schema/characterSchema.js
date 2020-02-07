let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterSchema = new Schema({
    _id: ObjectId,
    characterId: Number,
    characterFirstName: String,
    characterLastName: String,
    characterWeight: String,
    characterHeight: String,
    characterAge: String,
    characterApparence: String,
    characterStory: String,

});

module.exports = characterSchema;