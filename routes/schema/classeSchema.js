let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const classeSchema = new Schema({
    _id: ObjectId,
    classeId: Number,
    classeName: String,
    classeDescription: String,
    classeHitDie: String,
    classePrimaryAbility: String,
    classeSaves: String,
    classeArmors: String,
    classeWeapons: String,
    classeSkills: String,
    classeSpecialization: String,
    classeCompetences: String,

});

module.exports = classeSchema;