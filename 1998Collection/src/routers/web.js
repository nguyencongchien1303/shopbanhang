var express = require("express");
var {homeLogin,auth,homeShop,shopShop,aboutShop,productSingleShop,userLogin,admin} = require("./../controllers/index");
import {authValid,userValid} from "./../validation/index"
import passpord from "passport"
import initPassportLocal from "./../controllers/passportController/local"
import initPassportFacebook from "./../controllers/passportController/facebook"
import initPassportGoogle from "./../controllers/passportController/google"



initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let router = express.Router();

// @param app from exactly express module
let initRouters =(app) =>{ //app này đc truyền từ server.js qua
  //router.get("/",homeShop.getHomeShop)
  // router.get("/shop.html",shopShop.getShopShop)
  // router.get("/about.html",aboutShop.getAboutShop)
  // router.get("/product-single.html",productSingleShop.getProductSingleShop)


  router.get("/login", auth.checkLoggedIn,homeLogin.getHomeLogin)
  router.get("/login-register",auth.checkLoggedOut,auth.getLoginRegister)
  router.post("/register",auth.checkLoggedOut,authValid.register , auth.postRegister) // authValid.register này sẽ là lấy dữ liệu bên authValidation.js rồi so sánh với thằng auth.postRegister. nếu có lỗi thì sẽ log ra lỗi
  router.get("/verify/:token",auth.checkLoggedOut,auth.verifyAccount)// dùng để active tài khoản

  router.put("/user/update-avatar",auth.checkLoggedIn,userLogin.updateAvatar)
  router.put("/user/update-info",auth.checkLoggedIn,userValid.updateInfo,userLogin.updateInfo)
  router.put("/user/update-password",auth.checkLoggedIn,userLogin.updatePassword)



  router.get("/auth/facebook",auth.checkLoggedOut,passpord.authenticate("facebook",{scope:["email"]}))
  router.get("/auth/facebook/callback",auth.checkLoggedOut,passpord.authenticate("facebook",{
    successRedirect:"/login",
    failureRedirect:"/login-register",
  }))

  router.get("/auth/google",auth.checkLoggedOut,passpord.authenticate("google",{scope:["email"]}))
  router.get("/auth/google/callback",auth.checkLoggedOut,passpord.authenticate("google",{
    successRedirect:"/login",
    failureRedirect:"/login-register",
  }))

  router.post("/login",auth.checkLoggedOut, passpord.authenticate("local",{
    successRedirect:"/login",
    failureRedirect:"/login-register",
    successFlash:true,
    failureFlash:true
  }))
  
  router.get("/logout",auth.checkLoggedIn, auth.getLogout)


  router.get("/admin",admin.getAdmin)
  router.get("/dang-nhap.html",admin.getLogin)
  router.post("/dang-nhap.html",admin.postLogin)






  return app.use("/",router);

  
};



module.exports = initRouters;