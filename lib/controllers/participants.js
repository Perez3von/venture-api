const { Router } = require('express');
const Participants = require('../models/Participants');
const { cloudinary } = require('../utils/cloudinary');

module.exports = Router ()

  .get('/getAllParticipants/:ventureID', async (req, res, next) => {
    try {
      // console.log('PARAMS ->', req.params.ventureID);
      const allParticipants = await Participants.getChatThreadParticipants(req.params.ventureID); // *** THINK ON HOW TO USE IT IN THE FRONTEND ****
      res.send(allParticipants);
    } catch (error) {
      next(error);
    }
  })
  .patch('/updatephoto/:useremail', async (req, res, next) => {
    try {
      const userEmail = req.params.useremail;

      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'venture_chat',
      });

      // console.log('uploadResponse', uploadResponse);

      const uploadParticipantImage = await Participants.updateParticipientPhoto(userEmail, uploadResponse.url);

      // console.log('responseQuery', uploadParticipantImage);

      res.send(uploadParticipantImage);

      // res.json({ msg:'File Uploaded' });
     
    } catch (error) {
      next(error);
    }
  })

  .post('/joinchat', async (req, res, next) => {
    try {
      const v_id = req.body.ventureId;
      const guest_email = req.body.guestEmail;
      const name = req.body.name;

      const newParticipant = await Participants.addParticipant(v_id, guest_email, name);
  
      res.send(newParticipant);

     
    } catch (error) {
      next(error);
    }
  });
