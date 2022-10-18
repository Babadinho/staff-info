const pool = require('../dbHandler');

exports.staff = async (req, res) => {
  try {
    const staff = await pool.query(
      'SELECT * FROM staff JOIN department ON department.department_id = staff.department ORDER BY staff_id DESC'
    );
    if (staff) {
      return res.json(staff.rows);
    }
  } catch (err) {
    res.json(err);
  }
};

exports.getStaff = async (req, res) => {
  const id = req.params.staff_id;
  try {
    const staff = await pool.query('SELECT * FROM staff WHERE staff_id = $1', [
      id,
    ]);
    if (staff) {
      return res.json(staff.rows);
    }
  } catch (err) {
    res.json(err);
  }
};

exports.addStaff = async (req, res) => {
  const {
    staff_name,
    staff_email,
    staff_phone,
    staff_address,
    staff_image,
    department,
  } = req.body.values;

  if (
    !staff_name ||
    !staff_email ||
    !staff_phone ||
    !staff_address ||
    !staff_image ||
    !department
  )
    return res.status(400).json('All fields are required!');

  try {
    const staff = await pool.query(
      'INSERT INTO staff(staff_name, staff_email, staff_phone, staff_address, staff_image, department) VALUES($1, $2, $3, $4, $5, $6)',
      [
        staff_name,
        staff_email,
        staff_phone,
        staff_address,
        staff_image,
        parseInt(department, 10),
      ]
    );
    if (staff) {
      return res.status(200).json('Staff added successfully!');
    }
  } catch (err) {
    res.json(err);
  }
};

exports.searchStaff = async (req, res) => {
  const { search } = req.body;

  try {
    const staff = await pool.query(
      `SELECT * FROM staff WHERE staff_name ILIKE '%${search}%'`
    );
    if (staff) {
      return res.json(staff.rows);
    }
  } catch (err) {
    res.json(err);
  }
};

exports.updateStaff = (req, res) => {
  const { staff_id } = req.body;

  req.body.values.department = parseInt(req.body.values.department, 10);

  try {
    const keys = [
      'staff_name',
      'staff_email',
      'staff_phone',
      'staff_address',
      'staff_image',
      'department',
    ];
    const fields = [];

    keys.forEach((key) => {
      if (req.body.values[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
      pool.query(`UPDATE staff SET ${field}=($1) WHERE staff_id=($2)`, [
        req.body.values[field],
        staff_id,
      ]);
      if (field && index === fields.length - 1) {
        res.status(200).json('Staff updated successfully!');
      }
    });
  } catch (err) {
    res.json(err);
  }
};

exports.deleteStaff = async (req, res) => {
  const { staffId } = req.body;

  try {
    const staff = await pool.query('SELECT * FROM staff WHERE staff_id=($1)', [
      staffId,
    ]);

    if (staff.rows.length !== 0) {
      await pool.query('DELETE FROM staff WHERE staff_id=($1)', [staffId]);
      return res.status(200).json('Staff deleted successfully!');
    } else {
      res.status(400).json('Staff does not exist!');
    }
  } catch (err) {
    res.json(err);
  }
};
