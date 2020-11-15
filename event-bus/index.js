const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const e = req.body;

  events.push(e);

  axios.post('http://posts-clusterip-srv:4000/events', e);
  axios.post('http://comments-srv:4001/events', e);
  axios.post('http://query-srv:4002/events', e);
  axios.post('http://moderation-srv:4003/events', e);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
