const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const app = express();

// app middlewares
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

//route middleware
fs.readdirSync('./routes').map((routes) =>
  app.use('/api', require(`./routes/${routes}`))
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`API is running on port ${port}`));
