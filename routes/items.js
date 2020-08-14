const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const itemSchema = require('../schema/itemSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all items. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const items = await db.collection('items').find({}).toArray();

  res.send(items)
  client.close();
});

/* GET a specific item. */
router.get('/:itemId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const item = await db.collection('items').findOne({
    itemId: req.params.itemId
  });
  
  res.send(item)
  client.close();
});

/* Post item */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Item = mongoose.model("Item", itemSchema, 'items');
  const instance = new Item({
    _id: mongoose.Types.ObjectId(),
    itemId: 1,
    itemName: "Potion",
    itemType: "Potion",
    itemRarety: "commun",
    itemWeight: "0.5g",
    itemDescription: "String",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

module.exports = router;
