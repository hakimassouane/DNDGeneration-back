const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const classeSchema = require('../schema/classeSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all classes. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const classes = await db.collection('classes').find({}).toArray();

  res.send(classes)
  client.close();
});

/* GET a specific classe. */
router.get('/:classeId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const classe = await db.collection('classes').findOne({
    classeId: req.params.classeId
  });
  
  res.send(classe)
  client.close();
});

/* Post classe */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Classe = mongoose.model("Classe", classeSchema, 'classes');
  const instance = new Classe({
    _id: mongoose.Types.ObjectId(),
    classeId: 2,
    classeName: "Paladin",
    classeDescription: "String",
    classeHitDie: "1d8",
    classePrimaryAbility: "strenght",
    classeSaves: "Wisdom",
    classeArmors: "mall",
    classeWeapons: "sword",
    classeSkills: "String",
    classeSpecialization: "protector",
    classeCompetences: "heal",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

module.exports = router;
