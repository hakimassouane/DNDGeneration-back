const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const featSchema = require('../schema/featSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all feats. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const feats = await db.collection('feats').find({}).toArray();

  res.send(feats)
  client.close();
});

/* GET a specific feat. */
router.get('/:featId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const feat = await db.collection('feats').findOne({
    featId: req.params.featId
  });
  
  res.send(feat)
  client.close();
});

/* Post feat */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Feat = mongoose.model("Feat", featSchema, 'feats');
  const instance = new Feat({
    _id: mongoose.Types.ObjectId(),
    featId: 1,
    featName: "Maitrise epee a deux mains",
    featPrerequisite: "Humain",
    featDescription: "String",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

module.exports = router;
