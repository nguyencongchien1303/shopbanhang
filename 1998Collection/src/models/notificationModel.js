import mongoose from "mongoose";

let Schame = mongoose.Schema;

let NotificationSchame = new Schame({
  sender:{
    id:String,
    username:String,
    avatar:String
  },
  receiver:{
    id:String,
    username:String,
    avatar:String
  },
  text:String,
  content:String,
  isRead:{type:Boolean,default:false},
  file:{data:Buffer,contentType:String,fileName:String},
  createdAt:{type:Number,default:Date.now}
});

module.exports=mongoose.model("notification",NotificationSchame);  //user ở đây để số ít thì khi thêm vào bảng trong mongo thì nó sẽ tự thêm S vào thành users