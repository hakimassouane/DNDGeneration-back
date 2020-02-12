const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const spellSchema = require('./schema/spellSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all spells. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const spells = await db.collection('spells').find({}).toArray();

  res.send(spells)
  client.close();
});

/* GET a specific spell. */
router.get('/:spellId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const spell = await db.collection('spells').findOne({
    spellId: req.params.spellId
  });
  
  res.send(spell)
  client.close();
});

/* Post spell */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Spell = mongoose.model("Spell", spellSchema, 'spells');
  const instance = new Spell({
    _id: mongoose.Types.ObjectId(),
    spellId: 2,
    spellName: "test",
    spellLevel: 1,
    spellDamage: "1d8",
    spellRange: 7,
    spellCastingTime: "instanst",
    spellDuration: "1m",
    spellComponent: "V",
    spellDescription: "String",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

module.exports = router;
