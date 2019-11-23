import mongoose from "mongoose";

let Schame = mongoose.Schema;

let ChatGroupSchame = new Schame({
  name: String,
  userAmount:{type:Number,min:3,max:20},
  messageAmount:{type:Number,default:0},
  userId:String,
  member:[
    {userId:String},
  ],
  createdAt:{type:Number,default:Date.now},
  updatedAt:{type:Number,default:null},
  deletedAt:{type:Number,default:null},
});

module.exports=mongoose.model("chatGroup",ChatGroupSchame);  //user ở đây để số ít thì khi thêm vào bảng trong mongo thì nó sẽ tự thêm S vào thành users