var mongoose= require ("mongoose");
var bluebird = require ("bluebird");

let Schame = mongoose.Schema;

let ContactSchame = new Schame({
  userId: String,
  contactId:String,
  status:{type:Boolean,default:false},
  createdAt:{type:Number,default:Date.now},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null},
});

ContactSchame.statics = {
  createNew(item) {
    return this.create(item);
  }
}

module.exports=mongoose.model("contact",ContactSchame);  //user ở đây để số ít thì khi thêm vào bảng trong mongo thì nó sẽ tự thêm S vào thành users