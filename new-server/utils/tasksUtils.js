const { runStoredProcedure} = require('../services/dbService');
const sql = require('mssql');
const { log , levels } = require('./logUtils');

function getTasks(){
    return new Promise((resolve, reject) =>{
      runStoredProcedure('spGetTasks').then(({recordset}) => {
        log(`spGetTasks result:${recordset.length}`,levels.INFORMATION)
        resolve  (recordset) ;
    }).catch(err => {
        log( err, levels.ERROR);
        reject(err);
    })
    })
}

function addOrUpdateTask(task){
    const{taskId, name, description, price, scheduling, status} = task;
    return new Promise((resolve, reject) =>{
      const params = {
          taskId: { type: sql.Int, value: taskId   },
          name: { type: sql.NVarChar(50), value: name   },
          description: { type: sql.NVarChar(sql.MAX), value: description   },
          price: { type: sql.Float, value: price   },
          scheduling: { type: sql.Date, value: scheduling   },
          status: { type: sql.Int, value: status   },
      };

      runStoredProcedure('spAddOrUpdateTask', params).then((_) => {
          resolve  (true) ;
        }).catch(err => {
            log( err, levels.ERROR);
            reject(err);
        })
    })
}


function deleteTask(taskId){
 
    return new Promise((resolve, reject) =>{
      const params = {
          taskId: { type: sql.Int, value: taskId   },
      };

      runStoredProcedure('spDeleteTask', params).then((_) => {
          resolve  (true) ;
        }).catch(err => {
            log( err, levels.ERROR);
            reject(err);
        })
    })
}




module.exports = { getTasks, addOrUpdateTask, deleteTask};