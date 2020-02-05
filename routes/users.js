const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema.js')
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all users. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const users = await db.collection('users').find({}).toArray();

  res.send(users)
  client.close();
});

/* Post user */
router.post('/', async (req, res, next) => {
  mongoose.connect(process.env.DB_URL, mongoOptions);
  const User = mongoose.model("User", userSchema, 'users');
  const instance = new User({
    _id: mongoose.Types.ObjectId(),
    userId: 2,
    userName: "test",
  });
  
  await instance.save();
  res.sendStatus(201);
  mongoose.connection.close();
});

/* GET a specific user. */
router.get('/:userId', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const user = await db.collection('users').findOne({
    userId: req.params.userId
  });
  
  res.send(user)
  client.close();
});

module.exports = router;
