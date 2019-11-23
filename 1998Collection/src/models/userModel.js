import mongoose from "mongoose"
import bcrypt from "bcrypt"

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: { type: String, default: "male" },
  phone: { type: Number, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar-default.jpg" },
  role: { type: String, default: "user" },
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
})

//thằng statics thì chỉ giúp chúng ta tìm ra các bản ghi mà thôi
//đây là dùng để tạo mới trong database
UserSchema.statics = {
  createNew(item) {
    return this.create(item)
  },
  findByEmail(email){
    return this.findOne({"local.email" : email}).exec();
  },
  removeById(id){
    return this.findByIdAndRemove(id).exec()
  },
  findByToken(token) {
    return this.findOne({"local.verifyToken":token}).exec();
  },
  verify(token){ //truyền vào token cần update. 
    return this.findOneAndUpdate(
      {"local.verifyToken":token}, //tìm chỗ có token
      {"local.isActive":true,"local.verifyToken":null} // sửa 2 thằng này lại
    ).exec();
  },
  findUserById(id) {
    return this.findById(id).exec()
  },
  findByFacebookUid(uid){
    return this.findOne({"facebook.uid":uid}).exec()
  },
  findByGoogleUid(uid){
    return this.findOne({"google.uid":uid}).exec()
  },
  updateUser(id,item){
    return this.findByIdAndUpdate(id,item).exec() //trả về dữ liệu cũ sau khi nó update
  }
}

//thằng methods tức là khi chúng ta đã tìm thấy bản ghi rồi, chúng ta sẽ gọi đến các phương thức bên trong thằng medthods để so sánh giá trị
//tức là: mật khẩu nhập vào sẽ được mã hóa đi, và để so sánh cái đã mã hóa với thằng có trong database thì chúng ta cần phải dùng methods
//hàm này sử dụng để kiểm tra password nhập vào xem có đúng hk, để còn được login
UserSchema.methods = {
  comparePassword(password){
    return bcrypt.compare(password,this.local.password) //hàm này sẽ trả về giá trị true or false
  }
}

module.exports = mongoose.model("user", UserSchema) //user ở đây để số ít thì khi thêm vào bảng trong mongo thì nó sẽ tự thêm S vào thành users
