const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const featSchema = require('../schema/featSchema.js');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.getAllFeats = async function(req, res) {
    try {
        const db =  await getDb();
        const feats = await db.collection('feats').find({}).sort({ name: 1}).toArray();
        res.send(feats)
        closeConnection();
    } catch(e){
        return e;
    }
}

exports.getFeat = async function(req , res) {
    try {
        const db =  await getDb();
        const feat = await db.collection('feats').findOne({
            featId: req.params.featdId
        });
        
        res.send(feat)
        closeConnection();
    } catch(e) {
        return e;
    }
}

exports.createFeat = async function(req, res){
    mongoose.connect(process.env.DB_URL, mongoOptions);
    const Feat = mongoose.model("Feat", featSchema, 'feats');
    const instance = new Feat({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        entries: [req.body.introduction],
        source: "Custom",
        page: "N/A"
    });

    const featExist = await checkIfFeatExist(req.body.name);
    if (featExist) {
        closeConnection();
        res.json({error: "Feat already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
            } else {
              res.status(201).send('The feat has been successfully created.');
            }
              closeConnection();
        });
    }
}

async function checkIfFeatExist(name) {
    const db =  await getDb();
        const findFeat = await db.collection('feats').findOne({name: name});
    if (findFeat) {
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