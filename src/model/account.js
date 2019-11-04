var mongoose = require('mongoose');
var account = new mongoose.Schema({ 
  yourname: 'string', 
  youremail: 'string', 
  password: 'string', 
  repeatpassword: 'string',
  token: 'string' },{collection:'account'});

module.exports = mongoose.model('account', account);
 