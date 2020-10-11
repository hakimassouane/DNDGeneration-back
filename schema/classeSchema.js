let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const classeSchema = new Schema({
    _id: ObjectId,
    classeId: Number,
    name: String,
    description: String,
    hd: Object,
    spellCastingAbility: String,
    canCastSpell: String,
    spellPrepareType: String,
    knowsAllSpell: String,
    source: String,

});

module.exports = classeSchema;