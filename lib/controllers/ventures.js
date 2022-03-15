const { Router } = require('express');
const Venture = require('../models/Venture');

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

  });









  


