const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

// ! ★ cors =======================================
// https://www.npmjs.com/package/cors
// (1) Simple Usage (Enable All CORS Requests)
// app.use(cors());
// (2) Configuring CORS
// ex1>
// app.use(
//   cors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   }),
// );
// ex2>
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST', 'PUT', 'DELETE'], // ! HEAD, OPTIONS ?
    credentials: true,
  }),
);
// ================================================

app.use(logger('dev'));

// ! ★ express ====================================
// https://expressjs.com/ko/
// (1) https://expressjs.com/ko/4x/api.html#express.json
app.use(express.json());
// (2) https://expressjs.com/ko/4x/api.html#express.urlencoded, https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436
// app.use(express.urlencoded({ extended: false }));
// ================================================

app.use('/', (req, res) => {
  res.send('welcome to datda world!! hello!!');
});

app.listen(5000, () => {
  console.log('server on 5000');
});
