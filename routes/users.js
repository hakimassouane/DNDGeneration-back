const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema.js');
const bcrypt = require('bcrypt');
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

const userController = require('../controllers/users.controllers');

/* GET all users. */
router.get('/', async function(req, res, next) {
  const client = await MongoClient.connect(process.env.DB_URL, mongoOptions);
  const db = client.db(process.env.DB_NAME);
  const users = await db.collection('users').find({}).toArray();

  res.send(users)
  client.close();
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

/* Post user (create user) */

router.route('/login').post(userController.logUser)
router.route('/register').post(userController.createUser);


module.exports = router;
