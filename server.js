const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const app = express();

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

//route middleware
fs.readdirSync('./routes').map((routes) =>
  app.use('', require(`./routes/${routes}`))
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
}

const port = process.env.APP_PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
