const express = require('express');
const controller = require('../controllers/translateDocController');

const router = express.Router();

//Translate the document
router.post('/', controller.translateDocument);

//Get all the supported file formats for document translation
router.get('/fileformats', controller.getFileFormats);

//Get all the supported file formats for document translation with parameters
router.get('/to/:languageTo', controller.translateDocToParams);

module.exports = router;