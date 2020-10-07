const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const characterSchema = require('../schema/characterSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.getAllCharacters = async function(req, res) {
    try {
        const db = await getDb();
        const characters = await db.collection('characters').find({}).toArray();
        res.send(characters)
        closeConnection();
    } catch(e){
        return e;
    }
}

exports.getCharacter = async function(req , res) {
    try {
        const db =  await getDb();
        const character = await db.collection('characters').findOne({
            characterId: req.params.characterId
        });
        
        res.send(character)
        closeConnection();
    } catch(e) {
        return e;
    }
}

exports.createCharacter = async function(req, res){
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

    const characterExist = await checkIfCharacterExist(req.body.characterName);
    if (characterExist) {
        closeConnection();
        res.json({error: "Character already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
            } else {
              res.status(201).send('The character has been successfully created.');
            }
              closeConnection();
        });
    }
}

async function checkIfCharacterExist(name) {
    const db =  await getDb();
        const findCharacter = await db.collection('characters').findOne({characterName: name});
    if (findCharacter) {
        return true;
    }
    return false;
}


async function getDb(){
    try {
        const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
        return client.db(process.env.DB_NAME); 
    } catch(e){
        throw e;
    }
}

async function closeConnection(){
    mongoose.connection.close();
}