// trong phát triển phần mềm:
// Validation là quá trình kiểm tra dữ liệu đầu vào của người dùng để đảm bảo rằng nó hợp lệ và phù hợp với yêu cầu của hệ thống.
// Ví dụ: kiểm tra rằng một địa chỉ email được nhập vào có đúng định dạng hay không, hoặc một trường số chỉ chứa các ký tự số.

const validateUser = (data, file) => {
  const errors = {};
  if (!data.name) {
    errors.name = "Vui lòng nhập họ và tên";
  }
  if (!data.email) {
    errors.email = "Vui lòng nhập email";
  }
  if (!data.phone) {
    errors.phone = "Vui lòng nhập số điện thoại";
  }
  //   if (!file) {
  //     errors.avatar = "vui lòng thêm avatar";
  //   }
  //    else này là xử lý 1 ảnh
  //    else {
  //      //kiểm tra định dạng của file avatar
  //      const allowerAvatarFormats = ["image/jpeg", "image/png", "image/gif"];
  //      if (!allowerAvatarFormats.includes(file.mimetype)) {
  //        errors.avatar = "định dạng không hợp lệ";
  //      }
  //      const maxSize = 1024 * 1024; //1MB
  //      if (file.size > maxSize) {
  //        errors.avatar =
  //          "hình ảnh có dung lượng quá lớn đề nghị thêm ảnh với dung lượng nhỏ hơn 1MB ";
  //      }
  //    }
  if (!file || (Array.isArray(file) && file.length === 0)) {
    errors.avatar = "Vui lòng upload avatar";
  } else {
    const files = Array.isArray(file) ? file : [file];
    files.forEach((value) => {
      // Kiểm tra định dạng của file avatar
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedFormats.includes(value.mimetype)) {
        errors.avatar =
          "Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF";
      }

      // Kiểm tra dung lượng của file avatar (giả sử giới hạn là 1MB)
      const maxSize = 1024 * 1024; // 1MB
      if (value.size > maxSize) {
        errors.avatar =
          "Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB";
      }
    });
  }
  // Kiểm tra các trường khác và thêm các lỗi nếu cần
  return errors;
};
module.exports = {
  validateUser,
};
