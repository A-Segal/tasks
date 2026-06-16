const { runStoredProcedure} = require('./../services/dbService');
const sql = require('mssql');
const { log , levels } = require('./logUtils');

function checkLogin(userName, password){

    return new Promise((resolve, reject) =>{
      const params = {
          userName: { type: sql.NVarChar(30), value: userName   },
          password: { type: sql.NVarChar(30), value: password   },
      };

      runStoredProcedure('spCheckUserLogin', params).then(({recordset}) => {
        log(`spCheckUserLogin result:${recordset}`,levels.INFORMATION)
        resolve  (recordset[0]) ;
    }).catch(err => {
        log( err, levels.ERROR);
        reject(err);
    })
    })
  }
  
    
  
module.exports = { checkLogin};