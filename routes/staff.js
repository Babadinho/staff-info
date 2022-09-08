const express = require('express');
const router = express.Router();

const {
  staff,
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staff');

// routes
router.post('/staff', staff);
router.get('/:staff_id', getStaff);
router.post('/add', addStaff);
router.put('/update/:staff_id', updateStaff);
router.post('/delete/:staff_id', deleteStaff);

module.exports = router;
