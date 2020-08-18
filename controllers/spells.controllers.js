const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const spellSchema = require('../schema/spellSchema.js');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.getAllSpells = async function(req, res) {
    try {
        const db =  await getDb();
        const spells = await db.collection('spells').find({}).sort({ name: 1}).toArray();
        res.send(spells)
        closeConnection();
    } catch(e){
        return e;
    }
}

exports.getSpell = async function(req , res) {
    try {
        const db =  await getDb();
        const spell = await db.collection('spells').findOne({
            spellId: req.params.spelldId
        });
        
        res.send(spell)
        closeConnection();
    } catch(e) {
        return e;
    }
}

exports.createSpell = async function(req, res){
    mongoose.connect(process.env.DB_URL, mongoOptions);
    const Spell = mongoose.model("Spell", spellSchema, 'spells');
    const instance = new Spell({
        _id: mongoose.Types.ObjectId(),
        spellId: 2,
        name: "test",
        spellLevel: 1,
        spellDamage: "1d8",
        spellRange: 7,
        spellCastingTime: "instanst",
        spellDuration: "1m",
        spellComponent: "V",
        spellDescription: "String",
    });

    const spellExist = await checkIfSpellExist(req.body.name);
    if (spellExist) {
        closeConnection();
        res.json({error: "Spell already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
            } else {
              res.status(201).send('The spell has been successfully created.');
            }
              closeConnection();
        });
    }
}

async function checkIfSpellExist(name) {
    const db =  await getDb();
        const findSpell = await db.collection('spells').findOne({name: name});
    if (findSpell) {
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