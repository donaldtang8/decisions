const express = require('express');
const router = express.Router();

const yelpController = require('../controllers/yelpController');

// Retrieve categories
router.post('/business', yelpController.getResultsBySearch);

module.exports = router;
