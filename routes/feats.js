const express = require('express');
const router = express.Router();

const featController = require('../controllers/feats.controllers');

/* GET all feats. */
router.route('/').get(featController.getAllFeats);

/* GET a specific feat. */
router.route('/:featId').get(featController.getFeat);


/* Post feat */
router.route('/create').post(featController.createFeat);


module.exports = router;
