const express = require('express');
const controller = require('../controllers/detectLanguageController');
const {validateBody} = require('../middleware/validator');

const router = express.Router();

//Detect the language of text sent
router.post('/', validateBody, controller.detectLanguage);

module.exports = router;