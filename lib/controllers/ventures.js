const { Router } = require('express');
const Venture = require('../models/Venture');
const { sendInvite, sendExport, sendNotification, sendCompletedBrainstorm } = require('../services/email');
const { renderTemplate } = require('../utils/helper');
const { cloudinary } = require('../utils/cloudinary');
// const { getAllVentures, getArchives, updateArchive, addArchive, completeVenture, lastUpdated } = require('../models/Venture');
module.exports = Router()

  .get('/', async (req, res, next) => {


    try {
      
  
      res.send('working');

    } catch (error) {
      next(error);
    }

  })

  .post('/create', async (req, res, next) => {

    try {
      const audioFileStr = req.body.hostAudio;
      let venture = {};
      if(audioFileStr.length !== 0){
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
          hostAudio: uploadResponse.url,
          creationDate:req.body.creationDate,
          lastUpdated:req.body.lastUpdated
        });
        console.log('uploadresponse -->', uploadResponse);
      }
      else{

        venture = await Venture.create({
          ventureID: req.body.ventureID,
          ventureTitle: req.body.ventureTitle,
          ventureName: req.body.ventureName,
          firstName: req.body.firstName,
          hostEmail: req.body.hostEmail,
          ventureBio: req.body.ventureBio,
          hostAudio: '',
          creationDate:req.body.creationDate,
          lastUpdated:req.body.lastUpdated
        });
        

      }
      // const venture = await Venture.create(req.body);
     
      res.send(venture);
        
    } catch (error) {
      throw new Error(error);
      // next(error);
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
      const { lastUpdated, message, ventureId } = req.body;
      const recievedMessage = await Venture.sendMessage(message);
      const update  = await Venture.lastUpdated(ventureId, lastUpdated);
      console.log(update);
      res.send(recievedMessage);
        
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
      const chatTemplate = await renderTemplate(ventureInfo.chat, ventureInfo.venture_name, ventureInfo.host_fname);
      sendExport(email, ventureInfo.venture_name, chatTemplate, ventureInfo.host_fname);
      res.sendStatus(200);

    } catch (error) {
      next(error);
      
    }
    
  })
  
  
  
  
  .post('/notification', async (req, res, next) => {

    try {
      
      const { emails, username, ventureTitle, chatroomLink } = req.body;
      console.log(emails);
      Promise.all(await emails.map(email => sendNotification(email, ventureTitle, username, chatroomLink)));
     

      res.sendStatus(200);

    } catch (error) {
      next(error);
      
    }
    
  })
  .post('/brainstorms', async (req, res, next) => {

    try {
      
      const { email } = req.body;
      const allVentures = await Venture.getAllVentures(email);
      const allArchives = await Venture.getArchives(email);
      res.send({ ventures:allVentures, archives:allArchives });

    } catch (error) {
      next(error);
      
    }
    
  })
  // .post('/archives', async (req, res, next) => {

//   try {
      
//     const { email, ventureId } = req.body;
//     const newArchive = await addArchive(ventureId, email);
     
//     res.send(newArchive);

//   } catch (error) {
//     next(error);
      
//   }
    
// })
  
  .put('/archives', async (req, res, next) => {

    try {
      
      const { email, ventureId } = req.body;
      const archiveUpdated = await Venture.updateArchive(ventureId, email);
      res.send(archiveUpdated);

    } catch (error) {
      next(error);
      
    }
  })
  
  
  .put('/complete', async (req, res, next) => {

    try {
      
      const { hostEmail, ventureId } = req.body;
      const venture = await Venture.completeVenture(ventureId, hostEmail);
      const host = venture.host_fname;
      const ventureTitle = venture.venture_name;
      const exportedChatTemplate = await renderTemplate(venture.chat, ventureTitle, host);
      //should filer host email from sending email?
      Promise.all(await venture.participants.map(email => sendCompletedBrainstorm(email, ventureTitle, exportedChatTemplate)));
      res.sendStatus(200);

    } catch (error) {
      next(error);
      
    }
  })
    
  .delete('/brainstorm', async (req, res, next) => {

    try {
      
      const { hostEmail, ventureId } = req.body;
      const venture = await Venture.deleteVenture(ventureId, hostEmail);
      res.send(venture);

    } catch (error) {
      next(error);
      
    }
  })


  .put('/lastupdated', async (req, res, next) => {

    try {
      
      const {  ventureId, lastUpdated } = req.body;
      await Venture.lastUpdated(ventureId, lastUpdated);

      res.sendStatus(200);

    } catch (error) {
      next(error);
      
    }
  });


  











  


