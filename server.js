const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const app = express();

//Cors config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

//route middleware
fs.readdirSync('./routes').map((routes) =>
  app.use('', require(`./routes/${routes}`))
);

const port = process.env.APP_PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
