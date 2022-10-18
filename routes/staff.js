const express = require('express');
const router = express.Router();

const {
  staff,
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  searchStaff,
} = require('../controllers/staff');
const { requireSignin } = require('../controllers/auth');

// routes
router.get('/staff', requireSignin, staff);
router.get('/:staff_id', requireSignin, getStaff);
router.post('/search', requireSignin, searchStaff);
router.post('/add', requireSignin, addStaff);
router.put('/update', requireSignin, updateStaff);
router.post('/delete', requireSignin, deleteStaff);

module.exports = router;
