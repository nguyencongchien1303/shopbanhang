var mongoose = require('mongoose');
var aothun = new mongoose.Schema({  nameShirt: 'string', priceDiscount: 'string', price: 'string', amount: 'string', img: 'string' },{collection:'aothun'});
module.exports = mongoose.model('aothun', aothun);
 