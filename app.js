/**********global variables**************/
ROOT_DIR = __dirname + '/';
IMAGE_FOLDER = 'public/media/';
ENVIRONMENT = 'local';
/****************************************/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const vhost = require('vhost');
const http = require('http');
const app = express();
const winston = require('./config/logger');
let config = require('config');
let domain = require('./config/domain_route')();


const db = require('./config/connection.js');

// console.log(db);

// force: true will drop the table if it already exists
// db.sequelize.sync({force: false}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

var storage = multer.diskStorage(
  {
      destination: './uploads/',
      filename: function ( req, file, cb ) {
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?

          cb( null, Math.floor(100000 + Math.random() * 900000).toString());
      }
  }
);

app.use(multer({dest:'./uploads/', storage: storage}).array('imageFile', 1));



for(let key of domain.domains) {
  app.use(vhost(key.domain_name, key.object));
}


db.mongo_init();

app.use(morgan('dev'));
app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/*****************************************/

/*****************************************/
// mongooseObj = require(ROOT_DIR + 'config/connection').mongo_init();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// error handlers

// development error handler
// will print stacktrace
if (config.env == 'local' || config.env == 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(config.server.port, () => {
  console.log(`Express server listening on port ${config.server.port} environment: ${config.env}`);
});

module.exports = app;
