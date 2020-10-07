/*const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const characterSchema = require('../schema/characterSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};*/

/* GET all characters. */
/*router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const characters = await db.collection('characters').find({}).toArray();

  res.send(characters)
  client.close();
});
*/
/* GET a specific character. */
/*router.get('/:characterId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const character = await db.collection('characters').findOne({
    characterId: req.params.characterId
  });
  
  res.send(character)
  client.close();
});*/

/* Post character */
/*router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const Character = mongoose.model("Character", characterSchema, 'characters');
  const instance = new Character({
    _id: mongoose.Types.ObjectId(),
    level: 1,
    xp: 0,
    characterName: req.body.characterName,
    race: req.body.raceName,
    classe: req.body.classeName,
    strengthScore: req.body.strengthScore,
    dexterityScore: req.body.dexterityScore,
    constitutionScore: req.body.constitutionScore,
    intelligenceScore: req.body.intelligenceScore,
    wisdomScore: req.body.wisdomScore,
    charismaScore: req.body.charismaScore,
    backgroundName: req.body.backgroundName,
    alignmentName: req.body.alignmentName,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    skinColor: req.body.skinColor,
    hairColor: req.body.hairColor,
    backStory: req.body.backStory,
    personality: req.body.personality,
    bonds: req.body.bonds,
    ideal: req.body.ideal,
    flawn: req.body.flawn,
    weaponName: req.body.weaponName,
    shieldName: req.body.shieldName,
    armorName: req.body.armorName
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});*/

const express = require('express');
const router = express.Router();

const characterController = require('../controllers/characters.controllers');

/* GET all characters. */
router.route('/').get(characterController.getAllCharacters);

/* GET a specific characters. */
router.route('/:characterId').get(characterController.getCharacter);


/* Post characters */
router.route('/create').post(characterController.createCharacter);

module.exports = router;
