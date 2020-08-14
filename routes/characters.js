const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const characterSchema = require('../schema/characterSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all characters. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const characters = await db.collection('characters').find({}).toArray();

  res.send(characters)
  client.close();
});

/* GET a specific character. */
router.get('/:characterId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const character = await db.collection('characters').findOne({
    characterId: req.params.characterId
  });
  
  res.send(character)
  client.close();
});

/* Post character */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Character = mongoose.model("Character", characterSchema, 'characters');
  const instance = new Character({
    _id: mongoose.Types.ObjectId(),
    characterId: 2,
    characterFirstName: "Rudeus",
    characterLastName: "Larck",
    characterWeight: "80kg",
    characterHeight: "1m85",
    characterAge: "25",
    characterApparence: "muscle",
    characterStory: "String",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

module.exports = router;
