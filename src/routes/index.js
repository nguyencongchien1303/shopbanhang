var express = require("express")
var router = express.Router()
let jwt    = require('jsonwebtoken')
var contactModel = require('../model/account.js');
var contactModel2 = require('../model/sanpham.js');

/* GET home page. */
router.get("/", function(req, res, next) {
  contactModel2.find({},function(err,dulieu1){
    res.render("index", { title: "Express" ,data:dulieu1})
    //console.log(dulieu1);
  })
  
})
/* GET home page. */
router.get("/index.html", function(req, res, next) {
  res.render("index", { title: "Express" })
})

router.get("/shop.html", function(req, res, next) {
  res.render("shop", { title: "Express" })
})

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


router.get("/createaccount", function(req, res, next) {
  res.render("createaccount", { title: "Thêm account" })
})
/* POst thêm  du lieu . */
router.post('/createaccount', function(req, res, next) {
  var phantu = {
    'yourname': req.body.name,
    'youremail':req.body.email,
    'password':req.body.pass,
    'repeatpassword':req.body.re_pass
  }
  //console.log('yourname');
  var dulieu = new contactModel(phantu);
  dulieu.save(); 
  res.redirect('/createaccount');
});

router.get("/login.html", function(req, res, next) {
  res.render("login", { title: "Express" })
})

router.post("/login.html", function(req, res, next) {
  var youremail = req.body.your_name;
  var password = req.body.your_pass;
  contactModel.findOne({youremail:youremail,password:password},function(err,user){
    if(err)
    {
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      return res.status(405).send();
    }
    {
      var id = user._id;
      console.log(id);

      'use strict';
              var crypto = require('crypto');

              var genRandomString = function(length){
                  return crypto.randomBytes(Math.ceil(length/2))
                          .toString('hex') /** convert to hexadecimal format */
                          .slice(0,length);   /** return required number of characters */
              };

              var sha512 = function(password, salt){
                  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
                  hash.update(password);
                  var value = hash.digest('hex');
                  return {
                      salt:salt,
                      passwordHash:value
                  };
              };

              function saltHashPassword(userpassword) {
                  var salt = genRandomString(16); /** Gives us salt of length 16 */
                  var passwordData = sha512(userpassword, salt);
                  //console.log('UserPassword = '+userpassword);
                  var token1 = { 'token':passwordData.passwordHash }
                  console.log('Passwordhash = '+passwordData.passwordHash);
                  //console.log('nSalt = '+passwordData.salt);
                  contactModel.findById(id,function(err,dulieu){
                    if (err) return handleError(err);    
                    dulieu.token=token1;
                    dulieu.save();
                  })
              }

              saltHashPassword('MYPASSWORD');
              //saltHashPassword('MYPASSWORD');
              
    contactModel2.find({},function(err,dulieu1){
      contactModel.find({},function(err,dulieu2){
        res.render("index", { title: "Express" ,data:dulieu1,data2:dulieu2}
        )
        
      })
      
    })
  }
  })
 
})
module.exports = router
