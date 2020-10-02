const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const backgroundSchema = require('../schema/backgroundSchema.js');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.getAllBackgrounds = async function(req, res) {
    try {
        const db =  await getDb();
        const backgrounds = await db.collection('backgrounds').find({}).sort({ name: 1}).toArray();
        res.send(backgrounds)
        closeConnection();
    } catch(e){
        return e;
    }
}

exports.getBackground = async function(req , res) {
    try {
        const db =  await getDb();
        const background = await db.collection('backgrounds').findOne({
            backgroundId: req.params.backgroundId
        });
        
        res.send(background)
        closeConnection();
    } catch(e) {
        return e;
    }
}

exports.createBackground = async function(req, res){
    mongoose.connect(process.env.DB_URL, mongoOptions);
    const Background = mongoose.model("Background", backgroundSchema, 'backgrounds');
    const instance = new Background({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        version: req.body.version,
        skillProficiencies: req.body.skillProficiencies,
        toolProficiencies: req.body.toolProficiencies,
        introduction: req.body.introduction,
        source: "Custom",
        page: "N/A"
    });

    const backgroundExist = await checkIfBackgroundExist(req.body.name);
    if (backgroundExist) {
        closeConnection();
        res.json({error: "Background already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
            } else {
              res.status(201).send('The background has been successfully created.');
            }
              closeConnection();
        });
    }
}

async function checkIfBackgroundExist(name) {
    const db =  await getDb();
        const findBackground = await db.collection('backgrounds').findOne({name: name});
    if (findBackground) {
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