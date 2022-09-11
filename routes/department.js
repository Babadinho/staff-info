const express = require('express');
const router = express.Router();

const { departments, getDepartment } = require('../controllers/department');
const { requireSignin } = require('../controllers/auth');

// routes
router.get('/departments', requireSignin, departments);
router.get('/department/:departmentId', requireSignin, getDepartment);

module.exports = router;
