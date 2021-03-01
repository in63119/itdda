require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { sequelize } = require('./models');
// ! ===================================
const cookieParser = require('cookie-parser');
// https://www.npmjs.com/package/cookie-parser
const controllers = require('./controllers');
// ! ===================================

const app = express();
app.use(logger('dev'));

// ! ★ express ====================================
// https://expressjs.com/ko/
// (1) https://expressjs.com/ko/4x/api.html#express.json
app.use(express.json());
// (2) https://expressjs.com/ko/4x/api.html#express.urlencoded, https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436
// app.use(express.urlencoded({ extended: false }));
// ================================================

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
    origin: ['http://localhost:3000', 'https://datda.net'],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ! HEAD?
    credentials: true,
  }),
);
// ================================================
app.use(cookieParser());

// ! ★ sequelize sync =============================
sequelize
  .sync({ force: false, alter: false })
  .then(() => console.log('DB 접속 성공'))
  .catch((err) => console.log(err));
// ================================================

app.use('/', (req, res) => {
  res.send('welcome to datda world!! hello!!');
});

app.listen(5000, () => {
  console.log('server on 5000');
});
