const express = require('express');
const router = express.Router();
const { checkLogin} = require('./../utils/authUtils');
 
router.get('/check-login',  function (req,res,next){
    const {userName, password} = req.query;
    try {
          checkLogin(userName, password).then( (result =>{ 
            res.send(result);
        }));
        
    }
    catch (err){
        res.send(false);
    }
})


module.exports= router
