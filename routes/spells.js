const express = require('express');
const router = express.Router();

const spellController = require('../controllers/spells.controllers');

/* GET all spells. */
router.route('/').get(spellController.getAllSpells);

/* GET a specific spell. */
router.route('/:featId').get(spellController.getSpell);


/* Post spell */
router.route('/create').post(spellController.createSpell);

module.exports = router;
