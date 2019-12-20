import userAdmin from "../../models/user"

let getAdmin = (req,res)=>{
  
  return res.render("admin/main/index",{
    errors: req.flash("errors"), 
    success: req.flash("success")
  });
};

let getLogin = (req,res) =>{
  return res.render("admin/login/index")
}

let postLogin = (req,res) => {
  console.log(req.body.email)
  userAdmin.findOne({email: req.body.email}, (err, email) => {
    console.log(email)
  })
}
module.exports={
  getAdmin,
  getLogin,
  postLogin
};
// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// },

// function(username, password, done) {
//     User.findOne({email: username}, function(err, username){
//         if(err) throw err;
//         if(username){
//           bcrypt.compare(password, username.password, function(err, user) {
//               if(err) throw err;
//               if(user){
//                    return done(null, username);
//               }else{
//                  return done(null, false, { message: 'Tài Khoảng Không Đúng' });
//               }
//           });
//         }else{
//            return done(null, false, { message: 'Tài Khoảng Không Đúng' });
//         }
//     });
// }

// ));