const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use('/', (req, res) => {
  res.send('welcome to datda world!! hello!!');
});

app.listen(5000, () => {
  console.log('server on 5000');
});
