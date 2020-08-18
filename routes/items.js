const express = require('express');
const router = express.Router();

const itemController = require('../controllers/items.controllers');

/* GET all items. */
router.route('/').get(itemController.getAllItems);

/* GET a specific item. */
router.route('/:itemId').get(itemController.getItem);


/* Post item */
router.route('/create').post(itemController.createItem);

module.exports = router;
