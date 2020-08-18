const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const classeSchema = require('../schema/classeSchema.js');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.getAllClasses = async function(req, res) {
    try {
        const db =  await getDb();
        const classes = await db.collection('classes').find({}).sort({ name: 1}).toArray();
        res.send(classes)
        closeConnection();
    } catch(e){
        return e;
    }
}

exports.getClasse = async function(req , res) {
    try {
        const db =  await getDb();
        const classe = await db.collection('classes').findOne({
            classeId: req.params.classeId
        });
        
        res.send(classe)
        closeConnection();
    } catch(e) {
        return e;
    }
}

exports.createClasse = async function(req, res){
    mongoose.connect(process.env.DB_URL, mongoOptions);
    const Classe = mongoose.model("Classe", classeSchema, 'classes');
    const instance = new Classe({
        _id: mongoose.Types.ObjectId(),
        classeId: 2,
        name: "Paladin",
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

    const classeExist = await checkIfClasseExist(req.body.name);
    if (classeExist) {
        closeConnection();
        res.json({error: "classe already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
            } else {
              res.status(201).send('The classe has been successfully created.');
            }
              closeConnection();
        });
    }
}

async function checkIfClasseExist(name) {
    const db =  await getDb();
        const findClasse = await db.collection('classes').findOne({name: name});
    if (findClasse) {
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