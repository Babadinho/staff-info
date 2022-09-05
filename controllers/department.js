const pool = require('../dbHandler');

exports.departments = async (req, res) => {
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
