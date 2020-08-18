const express = require('express');
const router = express.Router();

const raceController = require('../controllers/races.controllers');

/* GET all races. */
router.route('/').get(raceController.getAllRaces);

/* GET a specific race. */
router.route('/:raceId').get(raceController.getRace);


/* Post race */
router.route('/create').post(raceController.createRace);

module.exports = router;
