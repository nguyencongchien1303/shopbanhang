let getAboutShop = (req,res)=>{
  
  return res.render("shop/about",{
    errors: req.flash("errors"), //này là dùng để truyền dữ liệu vào biến errors để quá bên view sẽ sử dụng được
    success: req.flash("success")
  });
};


module.exports={getAboutShop};