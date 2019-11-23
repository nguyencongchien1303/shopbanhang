let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null
let originUserInfo ={}


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
    userInfo.username=$(this).val();
  })
  $("#input-change-gender-male").bind("click",function(){
    userInfo.gender=$(this).val();
  })
  $("#input-change-gender-female").bind("click",function(){
    userInfo.gender=$(this).val();
  })
  $("#input-change-address").bind("change",function(){
    userInfo.address=$(this).val();
  })
  $("#input-change-phone").bind("change",function(){
    userInfo.phone=$(this).val();
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
})