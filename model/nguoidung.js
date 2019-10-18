var mongoose = require('mongoose');
var nguoidung = new mongoose.Schema({ ten: 'string', dienthoai: 'string' },{collection:'nguoidung'});
module.exports = mongoose.model('nguoidung', nguoidung);
 