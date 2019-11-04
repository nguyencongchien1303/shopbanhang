var express = require("express")
var router = express.Router()
var contactModel2 = require('../model/sanpham.js');
import shop from "./../controllers/index"

/* GET home page. */
router.get("/", function(req, res, next) {
  contactModel2.find({},function(err,dulieu1){
    res.render("index", { title: "Express" ,data:dulieu1})
    //console.log(dulieu1);
  })
  
})
// let initRouter = (app) =>{
//   router.get("/shop.html", shop.getShop)
// }

router.get("/shop.html", shop.getShop)

router.get("/about.html", function(req, res, next) {
  res.render("about", { title: "Express" })
})

router.get("/blog.html", function(req, res, next) {
  res.render("blog", { title: "Express" })
})

router.get("/blog-single.html", function(req, res, next) {
  res.render("blog-single", { title: "Express" })
})

router.get("/cart.html", function(req, res, next) {
  res.render("cart", { title: "Express" })
})

router.get("/checkout.html", function(req, res, next) {
  res.render("checkout", { title: "Express" })
})

router.get("/contact.html", function(req, res, next) {
  res.render("contact", { title: "Express" })
})

router.get("/product-single.html/:idsanpham", function(req, res, next) {
  var id2 = req.params.idsanpham  ; 
  contactModel2.find({_id : id2},function(err,dulieu1){
    res.render("product-single", { title: "Express",data:dulieu1 })
    console.log(dulieu1);
  })
})
router.post("/product-single/:idsanpham",function(req,res,next){
  var phantu = {
    'id':idsanpham,
    'nameShirt':req.body.name
  }
  console.log(phantu);

})
router.get("/login.html", function(req, res, next) {
  res.render("login", { title: "Express" })
})


module.exports = {initRouter}
