import UserModel from "./../models/userModel"
import bcrypt from "bcrypt"
import uuidv4 from "uuid/v4"
import { transErrors, transSuccess, transMail } from "./../../lang/vi"
import sendMail from "./../config/emailer"

let saltRounds = 7

let register = (email, gender, password, protocol, host) => {
  return new Promise(async (resolve, rejects) => {
    let userByEmail = await UserModel.findByEmail(email)
    if (userByEmail) {
      if (userByEmail.deletedAt != null) {
        return rejects(transErrors.account_removed)
      }
      if (!userByEmail.local.isActive) {
        return rejects(transErrors.account_not_active)
      }

      return rejects(transErrors.account_in_use)
    }
    let salt = bcrypt.genSaltSync(saltRounds) // này là dùng để tạo ra muối(kiểu đồng bộ ấy). sau đó truyền vào saltRounds có 7 giá trị thôi cho nó lẹ

    let userItem = {
      username: email.split("@")[0], //hàm này dùng để tách mảng thành 2 vế nhá
      gender: gender,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt), // .hashSync này là dùng để chạy đồng bộ với thằng salt trên kia. password nhập vào sẽ cộng thêm đoạn salt sinh ra ngẫu nhiên nữa
        verifyToken: uuidv4() // sinh ra 1 cái token ngẫu nhiên
      }
    }
    // console.log(userItem);
    let u = await UserModel.createNew(userItem)
    let linkVerify = `${protocol}://${host}/verify/${u.local.verifyToken}`
    //send Email
    sendMail(email, transMail.subject, transMail.template(linkVerify))
      .then(success => {
        //này là nếu thành công
        resolve(transSuccess.userCreated(u.local.email))
      })
      .catch(async err => {
        //nếu xảy ra lỗi lúc đăng ký tài khoản thì tải khoản sẽ không được thêm vào database( vì lý do là nó đã thêm vào ở đoạn trước cho nên chúng ta cần phải removed nó đi nhé)
        await UserModel.removeById(u._id)
        rejects(transMail.send_failed)
      })
  })
}

let verifyAccount =  (token) => {
  return new Promise(async(resolve, reject) => {
    let userByToken = await UserModel.findByToken(token)
    if(!userByToken){
      return reject(transErrors.token_undefined)
    }
   await UserModel.verify(token);
   resolve(transSuccess.account_actived)

  })
}

module.exports = {
  register: register,
  verifyAccount:verifyAccount
}
