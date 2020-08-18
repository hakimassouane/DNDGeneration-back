const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const itemSchema = require('../schema/itemSchema.js');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.getAllItems = async function(req, res) {
    try {
        const db =  await getDb();
        const items = await db.collection('items').find({}).sort({ name: 1}).toArray();
        res.send(items)
        closeConnection();
    } catch(e){
        return e;
    }
}

exports.getItem = async function(req , res) {
    try {
        const db =  await getDb();
        const item = await db.collection('items').findOne({
            itemId: req.params.itemdId
        });
        
        res.send(item)
        closeConnection();
    } catch(e) {
        return e;
    }
}

exports.createItem = async function(req, res){
    mongoose.connect(process.env.DB_URL, mongoOptions);
    const Item = mongoose.model("Item", itemSchema, 'items');
    const instance = new Item({
        _id: mongoose.Types.ObjectId(),
        itemId: 1,
        name: "Potion",
        itemType: "Potion",
        itemRarety: "commun",
        itemWeight: "0.5g",
        itemDescription: "String",
    });

    const itemExist = await checkIfItemExist(req.body.name);
    if (itemExist) {
        closeConnection();
        res.json({error: "Item already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
            } else {
              res.status(201).send('The item has been successfully created.');
            }
              closeConnection();
        });
    }
}

async function checkIfItemExist(name) {
    const db =  await getDb();
        const findItem = await db.collection('items').findOne({name: name});
    if (findItem) {
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