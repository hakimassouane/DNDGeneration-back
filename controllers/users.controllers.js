
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema.js');
const bcrypt = require('bcrypt');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

exports.createUser = async function(req, res){
    mongoose.connect(process.env.DB_URL, mongoOptions);
    const User = mongoose.model("User", userSchema, 'users');
    const hashedPassword = await cryptPassword(req.body.password);
    const instance = new User({
      _id: mongoose.Types.ObjectId(),
      userName: req.body.name,
      userEmail: req.body.email,
      userPassword: hashedPassword
    });

    const emailExist = await checkIfEmailExist(req.body.email);
    if (emailExist) {
        closeConnection();
        res.json({error: "Email already exist!"});
        
    } else {
        await instance.save(err => {
            if(err) {
              res.status(424).send(err);
              //res.status(424).send('Failed to create user!');
            } else {
              res.status(201).send('The user has been successfully created.');
            }
              closeConnection();
        });
    }
    
}


exports.logUser = async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    try {
        const db =  await getDb();
        const findUser = await db.collection('users').findOne({userEmail: email});
        
        if(!findUser){
            closeConnection();
            res.json({error: "Email is wrong"});
        }
        
        const matchPasword = await comparePassword(password, findUser.userPassword);

        if(matchPasword){
            delete findUser.userPassword;
            res.status(200).send(findUser);
            closeConnection();
        }
        closeConnection();
        res.json({error: "Password is wrong"});
    } catch(e){
        return  e;
    }
}


async function cryptPassword(password) {
    return await bcrypt.hash(password, Number(process.env.SALT)).then((hash) => hash);
}

async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch(e){
        throw e;
    }
}

async function getDb(){
    try {
        const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
        return client.db(process.env.DB_NAME); 
    } catch(e){
        throw e;
    }
}

async function checkIfEmailExist(email) {
    const db =  await getDb();
        const findUser = await db.collection('users').findOne({userEmail: email});
    if (findUser) {
        return true;
    }
    return false;
}

async function closeConnection(){
    mongoose.connection.close();
}
