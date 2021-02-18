import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/', (req, res) => {
  res.send('welcome to the reach world!! hello!!');
});

app.listen(5000, () => {
  console.log('server on 5000');
});
