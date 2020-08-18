const express = require('express');
const router = express.Router();

const classeController = require('../controllers/classes.controllers');

/* GET all classes. */
router.route('/').get(classeController.getAllClasses);

/* GET a specific classe. */
router.route('/:classeId').get(classeController.getClasse);


/* Post classe */
router.route('/create').post(classeController.createClasse);

module.exports = router;
