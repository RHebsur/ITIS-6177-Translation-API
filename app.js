//Node Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const detectRoute = require('./routes/detectRoute');
const translateRoute = require('./routes/translateRoute');
const translateDocRoute = require('./routes/translateDocRoute');

let port = process.env.Port;
let host = process.env.Host;

//Create application
const app = express();

//Mount middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

//Routers for translate, dictionary and detect
app.use('/translate', translateRoute);
app.use('/detect', detectRoute);
app.use('/translatedocument', translateDocRoute);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Error Handling
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{
  console.log("Error: "+err); 
  if(!err.status) {
      let reqErr = new Error(err.response)
      reqErr.status = 400
      res.send(err);
  } else {
    res.send(err);
  }
});

app.listen(port, () => {
    console.log(`Translate API app is listening on http://${host}:${port}`);
});