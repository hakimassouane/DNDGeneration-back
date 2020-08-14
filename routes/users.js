const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controllers');

/* Get all users */
router.route('/').get(userController.getAllUsers);

/* Get specific user by ID **/
router.route('/:userId').get(userController.getUser);

/* Post user (connection) */
router.route('/login').post(userController.logUser);

/* Post user (create user) */
router.route('/register').post(userController.createUser);


module.exports = router;
