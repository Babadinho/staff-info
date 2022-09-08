const express = require('express');
const router = express.Router();

const { departments, getDepartment } = require('../controllers/department');

// routes
router.get('/departments', departments);
router.get('/department/:departmentId', getDepartment);

module.exports = router;
