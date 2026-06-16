
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { getConfig } =  require('./services/configService');
const {log, levels} =  require('./utils/logUtils');
const checkConnectionService =   require('./services/checkConnectionService');
const tasksService =   require('./services/tasksService');
const usersService =   require('./services/usersService');
const authenticationService =   require('./services/authenticationService');

app.use(
   bodyParser.urlencoded ({
      extended:true,
   })
);
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.use('/checkConnection',checkConnectionService);
app.use('/tasks', tasksService);
app.use('/users', usersService);
app.use('/auth', authenticationService);

app.use((req,res,next) => {
    const error = new Error("not found")
    Error.status=404;
    next(error)
})

 

//handler error middleware

app.use((error, req, res, next) =>{

res.status(error.statusCode || 500).send ({
    error:{ status:error.statusCode || 500,
          message: error.message || 'Internal Server Error'
       }
   })

})
 
 getConfig().then (
   (config) => {
      app.listen(config.APP_PORT, function () {
             log(`app listening on port ${config.APP_PORT }!`, levels.ALTER);
      });
   }

)

