import { validationResult } from "express-validator/check"
import { auth } from "./../../services/index"
import {transSuccess} from "./../../../lang/vi"


let getLoginRegister = (req, res) => {
  return res.render("authLogin/master", {
    errors: req.flash("errors"), //này là dùng để truyền dữ liệu vào biến errors để quá bên view sẽ sử dụng được
    success: req.flash("success")
  })
}

let postRegister = async (req, res) => {
  console.log(validationResult(req))
  //console.log(req.body)
  let errorArr = []
  let successArr = []
  let validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    //nếu !.isEmpty() này mà có lỗi thì nó sẽ đi vào trong if
    let errors = Object.values(validationError.mapped()) // thằng .mapped này là nó sẽ log tất cả các lỗi rồi bỏ vào 1 cái mảng
    errors.forEach(item => {
      errorArr.push(item.msg) //cái ở trên nó sẽ đưa ra nguyên 1 mảng lỗi to đùng thì chúng ta chỉ cần log ra cái msg mà thôi. nên lưu cái msg vào mảng errorArr nhá
    })
    req.flash("errors", errorArr) //cái mảng arr sẽ được lưu giá trị vào errors
    return res.redirect("/login-register")
  }
  try {
    let createUserSuccess = await auth.register(
      req.body.email,
      req.body.gender,
      req.body.password,
      req.protocol,  //này là lấy giao thức(search google là ra)
      req.get("host") // này sẽ lấy được localhost:1998/
    ) //này sẽ lấy được dữ liệu từ bên view rồi sẽ truyền vào thằng authService.js

    successArr.push(createUserSuccess)
    req.flash("success", successArr)
    return res.redirect("/login-register")
  } catch (error) {
    errorArr.push(error)
    req.flash("errors", errorArr) //cái mảng arr sẽ được lưu giá trị vào errors
    return res.redirect("/login-register")
  }
}


let verifyAccount = async (req,res) =>{
  let errorArr = []
  let successArr = []
  try {
    let verifyStatus = await auth.verifyAccount(req.params.token);
    successArr.push(verifyStatus)

    req.flash("success", successArr) //cái mảng arr sẽ được lưu giá trị vào errors
    return res.redirect("/login-register")
  } catch (error) {
    errorArr.push(error)
    req.flash("errors", errorArr) //cái mảng arr sẽ được lưu giá trị vào errors
    return res.redirect("/login-register")
  }
}

let getLogout = (req,res) =>{
  req.logout() //remove session passport user
  req.flash("success",transSuccess.logout_success)
  return res.redirect("/login-register")
}

let checkLogin = (req,res,next) => {
  if(!req.isAuthenticated()){ // nếu nó chưa đăng nhập thì đá về trang đăng nhập
    next();
  }
  next();
}

let checkLoggedIn = (req,res,next) =>{
  if(!req.isAuthenticated()){ // nếu nó chưa đăng nhập thì đá về trang đăng nhập
    return res.redirect("/login-register")
  }
  next();
}

let checkLoggedOut = (req,res,next) =>{
  if(req.isAuthenticated()){
    return res.redirect("/login-register")
  }
  next();
  
}

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister,
  verifyAccount:verifyAccount,
  getLogout:getLogout,
  checkLoggedIn:checkLoggedIn,
  checkLoggedOut:checkLoggedOut,
  checkLogin:checkLogin
}
