export const transValidation = {
  email_inconrrect:"Email phải có dạng example@gmail.com",
  gender_inconrrect:"ủa tại sao giới tính lại sai",
  password_inconrrect:"mật khẩu phải chứa it nhất 8 ký tự, bao gồm cả chữ hoa, chữ thường và chữ số và ký tự đặc biệt",
  password_confirmation_inconrrect:"mật khẩu không trùng khớp",
  update_username: "Username giới hạn trong khoảng 3-17 kí tự và không được chứa kí tự đặc biệt.",
  update_gender: "Oops! Dữ liệu giới tính có vấn đề. Bạn đã sửa à",
  update_address: "Địa chỉ giới hạn trong khoảng 3-30 kí tự.",
  update_phone: "Số điện thoại Viêt Nam bắt đầu bằng số 0 và giới hạn 10-11 kí tự."
};

export const transErrors = {
  account_in_use:"Email này đã được đăng ký.",
  account_removed:"Tài khoản này đã bị gỡ khỏi hệ thống, nếu tin rằng điều này là hieru nhầm, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi.",
  account_not_active:"Email này đã được đăng ký những active tài khoản. Vui lòng kiểm tra Email hoặc liên hệ với bộ phần hỗ trợ của chúng tôi.",
  account_undefined:"Tài khoản không tồn tại",
  token_undefined:"Tài Khoản này đã được Active. Vui lòng đăng nhập lại",
  login_failed:"Tài khoản hoặc mật khẩu không đúng!",
  server_error: "Có lỗi ở phía server, Vui lòng liên hệ đến bộ phận hỗ trợ của chúng tôi. Xin cảm ơn!",
  avatar_type: "Kiểu file không hợp lệ, chỉ chấp nhận jpg,jpeg,png",
  avatar_size:"Ảnh đượp upload không được quá 1MB",
  user_current_password_failed:"Mật khẩu hiện tại không chính xác"
};

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để active tài khoản trước khi đăng nhập. Xin cảm ơn!!`
  },
  account_actived:"Kích hoạt tài khoản thành công. Bạn đã có thể đăng nhập vào ứng dụng! ",
  loginSuccess:(username) =>{
    return `xin chào ${username}, chúc bạn một ngày tốt lành`
  },
  logout_success:"Đăng xuất tài khoản thành công, Hẹn gặp lại bạn!",
  avatar_updated:"Cập nhật ảnh đại diện thành công",
  user_info_updated:"Cập nhật thông tin người dùng thành công!",
  user_password_updated:"Cập nhật mật khẩu thành công!"
};

export const transMail = {
  subject:"Xác nhận kích hoạt tài khoản.",
  template:(linkVerify )=>{
    return `
      <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng.</h2>
      <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
      <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
      <h4>Nếu tin rằng Email này là nhầm lần, hãy bỏ qua nó. Trân trọng</h4>
    `
  },
  send_failed: "có lỗi trong quá trình gửi email, vui lòng liên hệ lại với bộ phận hỗ trợ của chúng tôi"
}