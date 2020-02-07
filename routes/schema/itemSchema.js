let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const itemSchema = new Schema({
    _id: ObjectId,
    itemId: Number,
    itemName: String,
    itemType: String,
    itemRarety: String,
    itemWeight: String,
    itemDescription: String,

});

module.exports = itemSchema;