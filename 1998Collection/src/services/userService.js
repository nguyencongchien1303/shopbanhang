import UserModel from "./../models/userModel"

let updateUser = (id,item) =>{  //item là thằng muốn update
  return UserModel.updateUser(id,item)
}

module.exports = {
  updateUser:updateUser
}