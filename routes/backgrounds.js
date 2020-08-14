const express = require('express');
const router = express.Router();

const backgroundController = require('../controllers/backgrounds.controllers');

/* GET all backgrounds. */
router.route('/').get(backgroundController.getAllBackgrounds);

/* GET a specific background. */
router.route('/:backgroundId').get(backgroundController.getBackground);


/* Post background */
router.route('/create').post(backgroundController.createBackground);

module.exports = router;
