let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const backgroundSchema = new Schema({
    _id: ObjectId,
    backgroundId: Number,
    name: String,
    backgroundSkillProficiencies: String,
    backgroundToolProficiencies: String,
    backgroundEquipment: String,
    backgroundDescription: String,
});

module.exports = backgroundSchema;