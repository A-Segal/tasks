 

const express = require('express');
const router = express.Router(); 
const fs = require('fs');

const { getTasks, addOrUpdateTask, deleteTask} = require('./../utils/tasksUtils');
 

const filePath = "services/tasks.json";

router.get('/gettasks',   function (req,res,next){

   try {
        getTasks().then( (result =>{ 
            res.send(result);
        }));
        
    }
    catch (err){
        res.send([]);
    }
})

router.post('/addtask',   function (req,res,next){
    const task = req.body;
    task.taskId = 0;
    try {
      addOrUpdateTask(task).then( (result =>{ 
            res.send(result);
        }));
    }
    catch (err){
        res.send(err);
    }
  })

router.put('/updatetask',   function (req,res,next){
    const task = req.body;
    try {
        addOrUpdateTask(task).then( (result =>{ 
            res.send(result);
        }));
    }
    catch (err){
        res.send(err);
    }
})

router.delete('/deletetask',   function (req,res,next){
       const {taskId} = req.query;
       try {
          deleteTask(taskId).then( (result =>{ 
              res.send(result);
          }));
      }
      catch (err){
        res.send(err);
      }
})





module.exports= router

 