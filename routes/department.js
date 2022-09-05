const express = require('express');
const router = express.Router();

const { departments } = require('../controllers/department');

// routes
router.get('/departments', departments);

module.exports = router;
