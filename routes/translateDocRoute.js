const express = require('express');
const controller = require('../controllers/translateDocController');

const router = express.Router();

//Translate the document
router.post('/', controller.translateDocument);

//Get all the supported file formats for document translation
router.get('/fileformats', controller.getFileFormats);

module.exports = router;