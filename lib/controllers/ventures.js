const { Router } = require('express');
const Venture = require('../models/Venture');
const { sendInvite, sendExport } = require('../services/email');
const { renderTemplate } = require('../utils/helper');
const { cloudinary } = require('../utils/cloudinary');
module.exports = Router()

  .post('/create', async (req, res, next) => {

    try {
      const audioFileStr = req.body.hostAudio;
      let venture = {};
      if(audioFileStr !== '' && audioFileStr !== null){
        const uploadResponse = await cloudinary.uploader.upload(audioFileStr, {
          upload_preset: 'venture_chat',
          resource_type:'video'
        });
        venture = await Venture.create({
          ventureID: req.body.ventureID,
          ventureTitle: req.body.ventureTitle,
          ventureName: req.body.ventureName,
          firstName: req.body.firstName,
          hostEmail: req.body.hostEmail,
          ventureBio: req.body.ventureBio,
          hostAudio: uploadResponse.url
        });
        console.log('uploadresponse -->', uploadResponse);
      }
      else{
        const uploadResponse = await cloudinary.uploader.upload(audioFileStr, {
          upload_preset: 'venture_chat',
          resource_type:'video'
        });
        venture = await Venture.create({
          ventureID: req.body.ventureID,
          ventureTitle: req.body.ventureTitle,
          ventureName: req.body.ventureName,
          firstName: req.body.firstName,
          hostEmail: req.body.hostEmail,
          ventureBio: req.body.ventureBio,
          hostAudio: null
        });
        console.log('uploadresponse -->', uploadResponse);

      }
      // const venture = await Venture.create(req.body);
     
      res.send(venture);
        
    } catch (error) {
      next(error);
    }


  })

  .get('/:ventureID', async (req, res, next) => {


    try {
        
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


  











  


