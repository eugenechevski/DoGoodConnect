var express = require('express');
var router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.getSearchResource);

module.exports = router;