import session from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);

let sessionStore = new MongoStore({
  url:`mongodb://localhost:27017/1998collection`,
  autoReconnect:true
  // console.log
  // autoRemove:"native"
})

let configSession = (app) =>{
  app.use(session({
    key:"express.sid",
    secret:"mySecret",
    store: sessionStore,
    resave: true,
    saveUninitialized:false,
    cookie:{
      maxAge:1000*60*60*24
    }
  }))
}
module.exports=configSession;