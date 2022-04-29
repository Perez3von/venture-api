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


const io = require('socket.io')(8900, {
  cors:{
    origin: 'https://venture-chat.netlify.app/'
  }
});


//track users? rooms?npm 
// <-- this is the problem
io.on('connection', (socket) => {
  let currRoom;

  console.log('connected', socket.id);
  console.log('yo');
  socket.on('create', ({ room }) => {
    currRoom = room;
    socket.join(room);
    console.log(room);
  });

  socket.on('sendMessage', ({ msg }) => {

    io.to(currRoom).emit('getMessage', {
      myMessage:msg
    });
    console.log(msg);

  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });
});

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
