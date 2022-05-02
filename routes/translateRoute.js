const express = require('express');
const controller = require('../controllers/translateController');
const {validateBody, validateResult} = require('../middleware/validator');

const router = express.Router();

//Translate the source text to target language
router.post('/', validateBody, validateResult, controller.translateText);

//Get all the languages supported for translation
router.get('/languages', controller.languages);

module.exports = router;