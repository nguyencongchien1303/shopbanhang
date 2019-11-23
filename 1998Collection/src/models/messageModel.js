import mongoose from "mongoose";

let Schame = mongoose.Schema;

let MessageSchame = new Schame({
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
  file:{data:Buffer,contentType:String,fileName:String},
  createdAt:{type:Number,default:Date.now},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null},
});

module.exports=mongoose.model("message",MessageSchame);  //user ở đây để số ít thì khi thêm vào bảng trong mongo thì nó sẽ tự thêm S vào thành users