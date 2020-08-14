const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const backgroundSchema = require('../schema/backgroundSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all backgrounds. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const backgrounds = await db.collection('backgrounds').find({}).sort({ name: 1}).toArray();

  res.send(backgrounds)
  client.close();
});

/* GET a specific background. */
router.get('/:backgroundId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const background = await db.collection('backgrounds').findOne({
    backgroundId: req.params.backgroundId
  });
  
  res.send(background)
  client.close();
});

/* Post background */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Background = mongoose.model("Background", backgroundSchema, 'backgrounds');
  const instance = new Background({
    _id: mongoose.Types.ObjectId(),
    backgroundId: 2,
    backgroundName: "Hero du peuple",
    backgroundSkillProficiencies: "strenght",
    backgroundToolProficiencies: "medal",
    backgroundEquipment: "sword",
    backgroundDescription: "String",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

module.exports = router;
