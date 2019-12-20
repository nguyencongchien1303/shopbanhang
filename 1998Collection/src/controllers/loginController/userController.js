import multer from "multer"
import { app } from "./../../config/app"
import { transErrors,transSuccess } from "./../../../lang/vi"
import uuidv4 from "uuid/v4"
import {user} from "./../../services/index"
import fsExtra from "fs-extra"
import { validationResult } from "express-validator/check"

let storageAvatar = multer.diskStorage({
  //nơi lưu trữ ảnh
  destination: (req, file, callback) => {
    callback(null, app.avatar_directory) //tham số đầu tiên là null, thứ 2 là đường dẫn đến nơi lưu trữ ảnh
  },
  filename: (req, file, callback) => {
    let math = app.avatar_type
    if (math.indexOf(file.mimetype) === -1) {
      //nếu file upload lên không đúng
      return callback(transErrors.avatar_type, null)
    }

    let avatarname = `${Date.now()}-${uuidv4()}-${file.originalname}`; //vì có thể tên ảnh giống nhau nên cần phải mã hóa đi
    callback(null, avatarname)
  }
})

let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: app.avatar_limit_size }
}).single("avatar")  //thằng avatar này phải trùng với thằng avatar ở dòng 40 của file updateUser.js trong public, để thằng multer nó mới nhận biết đc

let updateAvatar = (req, res) => {
  avatarUploadFile(req,res , async (error) =>{
    if(error) {
      // console.log(error)
      // return ;
      if(error.message) {
        return res.status(500).send(transErrors.avatar_size);
      }
      return res.status(500).send(error);
    }
    try {
      let updateUserItem = {
        avatar:req.file.filename,
        updatedAt:Date.now()
      };
      let userUpdate = await user.updateUser(req.user._id,updateUserItem)
      await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`); //xóa avatar cũ
      let result = {
        message: transSuccess.user_info_updated,
        imageSrc:`/images/users/${req.file.filename}`
      }
      return res.status(200).send(result)
    } catch (error) {
      return res.status(500).send(error);
    }
  //  console.log(req.file)
  })
}

let updateInfo = async (req,res) =>{
  let errorArr = []
  let validationError = validationResult(req)
  if (!validationError.isEmpty()) {
    //nếu !.isEmpty() này mà có lỗi thì nó sẽ đi vào trong if
    let errors = Object.values(validationError.mapped()) // thằng .mapped này là nó sẽ log tất cả các lỗi rồi bỏ vào 1 cái mảng
    errors.forEach(item => {
      errorArr.push(item.msg) //cái ở trên nó sẽ đưa ra nguyên 1 mảng lỗi to đùng thì chúng ta chỉ cần log ra cái msg mà thôi. nên lưu cái msg vào mảng errorArr nhá
    })
    
    return res.status(500).send(errorArr);
  }
  try {
    let updateUserItem = req.body; 
    await user.updateUser(req.user._id,updateUserItem)
    let result = {
      message: transSuccess.user_info_updated
    }
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

let updatePassword = async (req,res) =>{
  try {
    let updateUserItem = req.body;
    await user.updatePassword(req.user._id, updateUserItem)
    let result = {
      message: transSuccess.user_password_updated
    }
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  updateAvatar: updateAvatar,
  updateInfo:updateInfo,
  updatePassword:updatePassword
}
