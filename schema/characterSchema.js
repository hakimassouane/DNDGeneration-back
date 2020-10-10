let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterSchema = new Schema({
    //_id: ObjectId,
    _id: { type: String },
    level: Number,
    xp: Number,
    characterName: String,
    race: String,
    classe: String,
    strengthScore: Number,
    dexterityScore: Number,
    constitutionScore: Number,
    intelligenceScore: Number,
    wisdomScore: Number,
    charismaScore: Number,
    backgroundName: String,
    alignmentName: String,
    age: String,
    height: String,
    weight: String,
    skinColor: String,
    hairColor: String,
    backStory: String,
    personality: String,
    bonds: String,
    ideal: String,
    flawn: String,
    weaponName: String,
    shieldName: String,
    armorName: String
});

module.exports = characterSchema;