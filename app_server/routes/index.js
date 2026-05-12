const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');

router.get('/', controller.index);
router.get('/travel', controller.travel);

module.exports = router;