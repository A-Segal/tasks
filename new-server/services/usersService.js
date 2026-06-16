 

const express = require('express');
const router = express.Router(); 

const { getUsers, addUser, deleteUser} = require('../utils/usersUtils.js');

router.get('/getusers',   function (req,res,next){

   try {
        getUsers().then( (result =>{ 
            res.send(result);
        }));
        
    }
    catch (err){
        res.send([]);
    }
})

router.post('/adduser',   function (req,res,next){
    const user = req.body; 
    try {
      addUser(user).then( (result =>{ 
            res.send(result);
        }));
    }
    catch (err){
        res.send(err);
    }
  })


router.delete('/deleteuser',   function (req,res,next){
       const {userId} = req.query;
       try {
          deleteUser(userId).then( (result =>{ 
              res.send(result);
          }));
      }
      catch (err){
        res.send(err);
      }
})





module.exports= router

 