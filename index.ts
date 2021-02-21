import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());

app.use(morgan('dev'));
// using morgan in TS

app.use('/', (req, res) => {
  res.send('welcome to datda world!! hello!!');
});

app.listen(5000, () => {
  console.log('server on 5000');
});
