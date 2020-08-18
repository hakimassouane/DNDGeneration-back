const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const raceSchema = require('../schema/raceSchema.js');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.getAllRaces = async function(req, res) {
    try {
        const db =  await getDb();
        const races = await db.collection('races').find({}).sort({ name: 1}).toArray();
        res.send(races)
        closeConnection();
    } catch(e){
        return e;
    }
}

exports.getRace = async function(req , res) {
    try {
        const db =  await getDb();
        const race = await db.collection('races').findOne({
            raceId: req.params.racedId
        });
        
        res.send(race)
        closeConnection();
    } catch(e) {
        return e;
    }
}

exports.createRace = async function(req, res){
    mongoose.connect(process.env.DB_URL, mongoOptions);
    const Race = mongoose.model("Race", raceSchema, 'races');
    const instance = new Race({
        _id: mongoose.Types.ObjectId(),
        raceId: 1,
        name: "humain",
        raceDescription: "String",
    });

    const raceExist = await checkIfRaceExist(req.body.name);
    if (raceExist) {
        closeConnection();
        res.json({error: "Race already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
            } else {
              res.status(201).send('The race has been successfully created.');
            }
              closeConnection();
        });
    }
}

async function checkIfRaceExist(name) {
    const db =  await getDb();
        const findRace = await db.collection('races').findOne({name: name});
    if (findRace) {
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