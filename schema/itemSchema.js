let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const itemSchema = new Schema({
    _id: ObjectId,
    name: String,
    type: String,
    rarity: String,
    baseItemType: String,
    magicItemType: String,
    baseArmor: String,
    dexBonus: String,
    strRequirement: String,
    stealthCheck: String,
    baseWeapon: String,
    attunementDesc: String,
    entries: Array,
    source: String

});

module.exports = itemSchema;