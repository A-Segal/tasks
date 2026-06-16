const { runStoredProcedure} = require('../services/dbService');
const sql = require('mssql');
const { log , levels } = require('./logUtils');

function getUsers(){
    return new Promise((resolve, reject) =>{
      runStoredProcedure('spGetUsers').then(({recordset}) => {
        log(`spGetUsers result:${recordset.length}`,levels.INFORMATION)
        resolve  (recordset) ;
    }).catch(err => {
        log( err, levels.ERROR);
        reject(err);
    })
    })
}

function addUser(user){
    const{ userName, password, phone, email, roleId} = user;
    return new Promise((resolve, reject) =>{
      const params = {
          userName: { type: sql.NVarChar(50), value: userName   },
          password: { type: sql.NVarChar(10), value: password   },
          phone: { type: sql.NVarChar(15), value: phone   },
          email: { type: sql.NVarChar(50), value: email   },
          roleId: { type: sql.Int, value: roleId   },
      };

      runStoredProcedure('spAddUser', params).then((_) => {
          resolve  (true) ;
        }).catch(err => {
            log( err, levels.ERROR);
            reject(err);
        })
    })
}


function deleteUser(userId){
 
    return new Promise((resolve, reject) =>{
      const params = {
          userId: { type: sql.Int, value: userId   },
      };

      runStoredProcedure('spDeleteUser', params).then((_) => {
          resolve  (true) ;
        }).catch(err => {
            log( err, levels.ERROR);
            reject(err);
        })
    })
}




module.exports = { getUsers, addUser, deleteUser};