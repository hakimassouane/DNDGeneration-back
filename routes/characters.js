const express = require('express');
const router = express.Router();

const characterController = require('../controllers/characters.controllers');

/* GET all characters. */
router.route('/').get(characterController.getAllCharacters);

/* GET a specific characters. */
router.route('/:characterId').get(characterController.getCharacter);


/* Post characters */
router.route('/create').post(characterController.createCharacter);

module.exports = router;
