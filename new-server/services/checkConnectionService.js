 

const express = require('express');
const router = express.Router(); 
 

router.get('/checkconnection',   function (req,res,next){
       res.send(true); 
})

module.exports= router

 