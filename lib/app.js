const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {

  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET, POST'

};
const ventures = require('./controllers/ventures');
app.use(cors(corsOptions));
// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/ventures', ventures);
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
