let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const spellSchema = new Schema({
    _id: ObjectId,
    spellId: Number,
    name: String,
    spellLevel: Number,
    spellDamage: String,
    spellRange: Number,
    spellCastingTime: String,
    spellDuration: String,
    spellComponent: String,
    spellDescription: String,

});

module.exports = spellSchema;