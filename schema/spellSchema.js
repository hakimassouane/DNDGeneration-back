let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const spellSchema = new Schema({
    _id: ObjectId,
    name: String,
    level: Number,
    school: String,
    castingTime: Number,
    castingTimeType: String,
    reactionCastingTimeDesc: String,
    materialComponentsDesc: String,
    spellRangeType: String,
    rangeDistance: String,
    durationType: String,
    duration: Number,
    durationTime: String,
    levelScalingType: String,
    availbleForClasse: String,
    description: String,
    source: String,
    page: String

});

module.exports = spellSchema;