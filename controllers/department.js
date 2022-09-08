const pool = require('../dbHandler');

exports.departments = async (req, res) => {
  const id = req.params.department_id;
  try {
    const department = await pool.query(
      'SELECT * FROM department ORDER BY department_id ASC'
    );
    if (department) {
      return res.json(department.rows);
    }
  } catch (err) {
    res.json(err);
  }
};

exports.getDepartment = async (req, res) => {
  const id = req.params.departmentId;
  try {
    const staff = await pool.query(
      'SELECT * FROM staff WHERE department = $1 ORDER BY staff_id DESC',
      [id]
    );
    if (staff) {
      return res.json(staff.rows);
    }
  } catch (err) {
    res.json(err);
  }
};
