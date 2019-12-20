let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null
let originUserInfo ={}
let userUpdatePassword = {}


function updateUserInfo(){
  $("#input-change-avatar").bind("change",function(){
    let fileData = $(this).prop("files")[0]; //this là trỏ đến thằng #input-change-avatar
    let math = ["image/png","image/jpg","image/jpeg"];
    let limit = 1048576;

    if($.inArray(fileData.type, math)===-1){
      alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận file có đuôi jpg, png và jpeg.","error",7);
      $(this).val(null);
      return false;
    }
    if(fileData.size > limit){
      alertify.notify("Ảnh upload không được quá 1MB","error",7);
      $(this).val(null);
      return false;
    }
    if(typeof (FileReader) != undefined){
      let imagePreview = $("#image-edit-profile");
      imagePreview.empty(); // này để làm rỗng cái div chứa class image-edit-profile

      let fileReader = new FileReader();
      fileReader.onload = function(element){
        $("<img>",{
          "src":element.target.result,
          "class":"avatar img-circle",
          "id":"user-modal-avatar",
          "alt":"avatar"
        }).appendTo(imagePreview);

      }
      imagePreview.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append("avatar",fileData);

      userAvatar = formData;

    }else{
      alertify.notify("Trình duyệt của bạn chưa hỗ trợ FileReader","error",7);
    }
  })
  $("#input-change-username").bind("change",function(){
    let username = $(this).val();
    let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
    if(!regexUsername.test(username)||username.length < 3 || username.length > 17) {
      alertify.notify("Username giới hạn trong khoảng 3-17 kí tự và không được chứa kí tự đặc biệt.","error",7);
      $(this).val(originUserInfo.username)
      delete userInfo.username //
      return false;
    }
    userInfo.username = username;
  })
  $("#input-change-gender-male").bind("click",function(){
    let gender = $(this).val()
    if(gender !== "male"){
      alertify.notify("Oops! Dữ liệu giới tính có vấn đề. Bạn đã sửa à","error",7);
      $(this).val(originUserInfo.gender)
      delete userInfo.gender 
      return false;
    }
    userInfo.gender=gender;
  })
  $("#input-change-gender-female").bind("click",function(){
    let gender = $(this).val()
    if(gender !== "female"){
      alertify.notify("Oops! Dữ liệu giới tính có vấn đề. Bạn đã sửa à","error",7);
      $(this).val(originUserInfo.gender)
      delete userInfo.gender 
      return false;
    }
    userInfo.gender=gender;
  })
  $("#input-change-address").bind("change",function(){
    let address = $(this).val();
    if(address.length < 3 || address.length > 30) {
      alertify.notify("Địa chỉ giới hạn trong khoảng 3-30 kí tự.","error",7);
      $(this).val(originUserInfo.address)
      delete userInfo.address //
      return false;
    }
    userInfo.address=address;
  })
  $("#input-change-phone").bind("change",function(){
    let phone = $(this).val()
    let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/)
    if(!regexPhone.test(phone)){
      alertify.notify("Số điện thoại Viêt Nam bắt đầu bằng số 0 và giới hạn 10-11 kí tự.","error",7);
      $(this).val(originUserInfo.phone)
      delete userInfo.phone //
      return false;
    }
    userInfo.phone=phone;
  })
  $("#input-change-current-password").bind("change",function(){
    let currentPassword = $(this).val()
    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
    if(!regexPassword.test(currentPassword)){
      alertify.notify("mật khẩu phải chứa it nhất 8 ký tự, bao gồm cả chữ hoa, chữ thường và chữ số và ký tự đặc biệt.","error",7);
      $(this).val(null)
      delete userUpdatePassword.currentPassword
      return false;
    }
    userUpdatePassword.currentPassword=currentPassword;
  })
  $("#input-change-new-password").bind("change",function(){
    let newPassword = $(this).val()
    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
    if(!regexPassword.test(newPassword)){
      alertify.notify("mật khẩu phải chứa it nhất 8 ký tự, bao gồm cả chữ hoa, chữ thường và chữ số và ký tự đặc biệt.","error",7);
      $(this).val(null)
      delete userUpdatePassword.newPassword
      return false;
    }
    userUpdatePassword.newPassword=newPassword;
  })
  $("#input-change-confirm-new-password").bind("change",function(){
    let confirmNewPassword = $(this).val()
    if(!userUpdatePassword.newPassword) {
      alertify.notify("Bạn Chưa Nhập Mật Khẩu Mới!","error",7)
      $(this).val(null)
      delete userUpdatePassword.confirmNewPassword
      return false;
    }
    if(confirmNewPassword!==userUpdatePassword.newPassword) {
      alertify.notify("Nhập lại mật khẩu chưa chính xác","error",7)
      $(this).val(null)
      delete userUpdatePassword.confirmNewPassword
      return false;
    }
    userUpdatePassword.confirmNewPassword=confirmNewPassword;
  })
}

function callUpdateUserAvatar() {
  $.ajax({
      url:"/user/update-avatar",
      type:"put",
      cache:false,
      contentType:false,
      processData:false,
      data:userAvatar,
      success:function(result){
        $(".user-modal-alert-success").find("span").text(result.message)
        $(".user-modal-alert-success").css("display","block")

        //update ảnh ở thanh navbar
        $("#navbar-avatar").attr("src",result.imageSrc);

        // update originAvatarSrc
        originAvatarSrc=result.imageSrc;
        $("#input-btn-cancel-update-user").click()
      },
      error:function(error){
        $(".user-modal-alert-error").find("span").text(error.responseText)
        $(".user-modal-alert-error").css("display","block")

        //nếu có lỗi thì reset all
        $("#input-btn-cancel-update-user").click()
      }
    })
}

function callUpdateUserInfo(){
  $.ajax({
    url:"/user/update-info",
    type:"put",
    
    data:userInfo,
    success:function(result){
      $(".user-modal-alert-success").find("span").text(result.message)
      $(".user-modal-alert-success").css("display","block")

      originUserInfo= Object.assign(originUserInfo,userInfo)  //thằng assign sẽ làm nhiệm vụ là bỏ toàn bộ userInfo vào trong originUserInfo.(sẽ cùng key)

      //update username ở navbar
      $("#narbar-username").text(originUserInfo.username);

      $("#input-btn-cancel-update-user").click()
    },
    error:function(error){
      $(".user-modal-alert-error").find("span").text(error.responseText)
      $(".user-modal-alert-error").css("display","block")

      //nếu có lỗi thì reset all
      $("#input-btn-cancel-update-user").click()
    }
  })
}

function callUpdateUserPassword(){
  $.ajax({
    url:"/user/update-password",
    type:"put",
    
    data:userUpdatePassword,
    success:function(result){
      $(".user-modal-password-alert-success").find("span").text(result.message)
      $(".user-modal-password-alert-success").css("display","block")

      $("#input-btn-cancel-update-user").click()
    },
    error:function(error){
      $(".user-modal-password-alert-error").find("span").text(error.responseText)
      $(".user-modal-password-alert-error").css("display","block")

      //nếu có lỗi thì reset all
      $("#input-btn-cancel-update-user-password").click()
    }
  })
}

$(document).ready(function(){
  

  originAvatarSrc = $("#user-modal-avatar").attr("src")
  originUserInfo ={
    username:$("#input-change-username").val(),
    gender:($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val(),
    address:$("#input-change-address").val(),
    phone:$("#input-change-phone").val()
  }

  //updateUserInfo sau khi thay đổi giá trị muốn update
  updateUserInfo();
  $("#input-btn-update-user").bind("click",function(){
    if($.isEmptyObject(userInfo) && !userAvatar){
      alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu.","error",7);
      return false
    }
    if(userAvatar) {
      callUpdateUserAvatar();
    }
    if(!$.isEmptyObject(userInfo)){
      callUpdateUserInfo();
    }
    
  })
  
  $("#input-btn-cancel-update-user").bind("click",function(){
     userAvatar = null;
     userInfo = {};

     $("#input-change-avatar").val(null)
     $("#user-modal-avatar").attr("src",originAvatarSrc)

     $("#input-change-username").val(originUserInfo.username);
     (originUserInfo.gender==="male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click()
     $("#input-change-address").val(originUserInfo.address)
     $("#input-change-phone").val(originUserInfo.phone)
  })

  $("#input-btn-update-user-password").bind("click",function(){
     if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword)
     {
        alertify.notify("Bạn phải thay đổi đầy đủ thông tin!","error",7)
        return false
     }
     callUpdateUserPassword()
  })
  $("#input-btn-cancel-update-user-password").bind("click",function(){
     userUpdatePassword = {}
     $("#input-change-current-password").val(null)
     $("#input-change-new-password").val(null)
     $("#input-change-confirm-new-password").val(null)
  })
  
})