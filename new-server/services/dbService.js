const express = require('express');
const app = express();
const sql = require('mssql');
const { getConfig, getCurrentConfig} =  require('./configService');
const {log, levels} =  require('./../utils/logUtils');
 
function getSqlConfig(){
  const { SQL_SERVER, SQL_DBNAME, SQL_USERNAME, SQL_PASSWORD } = getCurrentConfig();
    return {
      user: SQL_USERNAME, 
      password: SQL_PASSWORD,
      server: SQL_SERVER,  
      database: SQL_DBNAME,
      options: {
        encrypt: false,
        trustServerCertificate: true
    }
  }; 
}
async function runStoredProcedure(spName, params){


  try{
        const poolConfig = getSqlConfig();
        const pool = await sql.connect(poolConfig);
        const request = pool.request();
      
        if(params){
        // מוסיפים את הפרמטרים דינמית
          Object.keys(params).forEach(key => {
              request.input(key, params[key].type, params[key].value);
          });
        }
         // ביצוע השאילתה
         return request.execute(spName);
  }
  catch(err){
     log(err, levels.ERROR);
  }
}


module.exports = {  runStoredProcedure };
