const { Router } = require('express');
const Venture = require('../models/Venture');
const { sendInvite, sendExport } = require('../services/email');
const { renderTemplate } = require('../utils/helper');
const io = require('socket.io')(8900, {
  cors:{
    origin: 'https://venture-chat.netlify.app/'
  }
});
module.exports = Router()

  .post('/create', async (req, res, next) => {

    try {
      
      const venture = await Venture.create(req.body);
     
      res.send(venture);
        
    } catch (error) {
      next(error);
    }


  })

  .get('/:ventureID', async (req, res, next) => {


    try {
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
        
      const venture = await Venture.getVenture(req.params.ventureID);
      res.send(venture);

    } catch (error) {
      next(error);
    }

  })

  .post('/message', async (req, res, next) => {

    try {
      
      const message = await Venture.sendMessage(req.body);

      res.send(message);
        
    } catch (error) {

      next(error);
    }

  })


  .get('/messages/:ventureID', async (req, res, next) => {

    try {
      const messages = await Venture.getMessages(req.params.ventureID);
      res.send(messages);
        
    } catch (error) {

      next(error);  
    }

  })

  .post('/newuser', async (req, res, next) => {

    try {
      const user = await Venture.addUser(req.body.firstName, req.body.email);
      res.send(user);
      
    } catch (error) {
      next(error);
    }

  })

  .post('/user', async (req, res, next) => {

    try {
  
      const user = await Venture.getUser(req.body.email);
      res.send(user);
        
    } catch (error) {
      next(error);
        
    }

  })

  .post('/allusers', async (req, res, next) => {

    try {
  
      const user = await Venture.getUsersProfile(req.body.participants);
      // console.log(user)
      res.send(user);
        
    } catch (error) {

      next(error);
        
    }

  })
  
  .post('/invite', async (req, res, next) => {

    try {
      const { email, ventureTitle, guestLink, hostName } = req.body;
      Promise.all(await email.map(email => sendInvite(email, ventureTitle, guestLink, hostName)));
      res.sendStatus(200);

    } catch (error) {
      next(error);
      
    }
  })

  .post('/export/:id', async (req, res, next) => {

    try {
      const ventureId = req.params.id;
      const { email } = req.body;
      const ventureInfo = await Venture.getVenture(ventureId);
      const chatTemplate = renderTemplate(ventureInfo.chat, ventureInfo.venture_name, ventureInfo.host_fname);
      sendExport(email, ventureInfo.venture_name, chatTemplate, ventureInfo.host_fname);
      res.sendStatus(200);

    } catch (error) {
      next(error);
      
    }
  });


  











  


