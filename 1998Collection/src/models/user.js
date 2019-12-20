var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var UserAdmin = new Schema({
 fullname 		: String,
 email 			: String,
 password 		: String,

},{collection : 'userAdmin'});

UserAdmin.statics = {
  findByEmail(email){
    return this.findOne({"local.email" : email}).exec();
  }
}


module.exports = mongoose.model('UserAdmin', UserAdmin);