const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const raceSchema = require('./schema/raceSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all races. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const races = await db.collection('races').find({}).toArray();

  res.send(races)
  client.close();
});

/* GET a specific race. */
router.get('/:raceId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const race = await db.collection('races').findOne({
    raceId: req.params.raceId
  });
  
  res.send(race)
  client.close();
});

/* Post race */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Race = mongoose.model("Race", raceSchema, 'races');
  const instance = new Race({
    _id: mongoose.Types.ObjectId(),
    raceId: 1,
    raceName: "humain",
    raceDescription: "String",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

module.exports = router;
