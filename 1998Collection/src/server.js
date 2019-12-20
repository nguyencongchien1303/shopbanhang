var express = require ("express");
var ConnectDB = require ( "./config/connectDB");
var configViewEngine = require("./config/viewEngine");
var initRouters = require("./routers/web")
import bodyParser from "body-parser"
import connectFlash from "connect-flash"
import configSession from "./config/session";
import passport from "passport"

var expressValidator = require('express-validator');

var index = require('./routers/admin/index');
var users = require('./routers/admin/users');
var admin = require('./routers/admin/admin');
var cate = require('./routers/admin/cate');
var product = require('./routers/admin/product');
var cart = require('./routers/admin/cart');

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

  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
  app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

  app.use('/', index);
  app.use('/users', users);
  app.use('/admin', admin);
  app.use('/admin/cate', cate);
  app.use('/admin/product', product);
  app.use('/admin/cart', cart);
  
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