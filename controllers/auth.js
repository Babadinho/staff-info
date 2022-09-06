const pool = require('../dbHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).send('All fields are required');

    const user = req.body;

    //hash password and INSERT new user
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        const user_data = pool.query(
          'INSERT INTO user_data(name, email, status, password) VALUES($1, $2, $3, $4)',
          [user.name, user.email, 'user', user.password]
        );
        if (user_data) {
          return res.status(200).json('Registration successfull!');
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  //validation
  if (!username || !password)
    return res.status(400).send('All fields are required');

  try {
    let user = await pool.query('SELECT * FROM user_data WHERE name = $1', [
      username,
    ]);

    if (user.rows.length === 0)
      return res.status(400).send('User does not exist');

    //match password
    bcrypt.compare(password, user.rows[0].password, function (err, match) {
      if (!match || err) {
        return res.status(400).send('Password is incorrect');
      }
      //Generate jwt signed token and send user data to client
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.json({
        token,
        user: {
          id: user.rows[0].id,
          username: user.rows[0].name,
          status: user.rows[0].status,
        },
      });
    });
  } catch (err) {
    console.log('Login ERROR', err);
    res.status(400).send('Login failed. try again');
  }
};
