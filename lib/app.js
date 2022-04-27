const express = require('express');
const app = express();
const cors = require('cors');
const participants = require('./controllers/participants');

const corsOptions = {

  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET, POST'

};
const ventures = require('./controllers/ventures');
app.use(cors(corsOptions));
// Built in middleware
// app.use(express.json());
app.use(express.json({ limit: '50mb' })); //to accept larger images
app.use(express.urlencoded({ limit: '50mb', extended: true })); // parse formdata

// App routes
app.use('/api/v1/ventures', ventures);
app.use('/api/v1/participants', participants);
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
