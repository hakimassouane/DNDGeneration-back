const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoOptions = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
};

/* GET all users. */
router.get('/', async function(req, res, next) {
  console.log("DB URL is ===> " + process.env.DB_URL);
  console.log("DB NAME is ===> " + process.env.DB_NAME);
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

module.exports = router;
