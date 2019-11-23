var express = require ("express");
var ConnectDB = require ( "./config/connectDB");
var configViewEngine = require("./config/viewEngine");
var initRouters = require("./routers/web")
import bodyParser from "body-parser"
import connectFlash from "connect-flash"
import configSession from "./config/session";
import passport from "passport"

import pem from "pem"
import https from "https"

pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err
  }
  let app = express();


  ConnectDB();

  configSession(app);

  configViewEngine(app);

  app.use(bodyParser.urlencoded({extended:true}));

  app.use(connectFlash());

  app.use(passport.initialize());
  app.use(passport.session());

  initRouters(app);
  
  let hostname="localhost";
  let port = 1998;
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(port,hostname,()=>{
    console.log(`I'm running at ${hostname}:${port}/`);
  });
})

// let app = express();


// ConnectDB();

// configSession(app);

// configViewEngine(app);

// app.use(bodyParser.urlencoded({extended:true}));

// app.use(connectFlash());

// app.use(passport.initialize());
// app.use(passport.session());

// initRouters(app);


// let hostname="localhost";
// let port = 1998;
// app.listen(port,hostname,()=>{
//   console.log(`I'm running at ${hostname}:${port}/`);
// });