let getHomeLogin = (req,res)=>{
  
  return res.render("mainLogin/home/home",{
    errors: req.flash("errors"), //này là dùng để truyền dữ liệu vào biến errors để quá bên view sẽ sử dụng được
    success: req.flash("success"),
    user: req.user
  });
};


module.exports={getHomeLogin};


