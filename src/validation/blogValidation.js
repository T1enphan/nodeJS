const validateBlog = (data, file) => {
  const errors = {};
  if (!data.title) {
    errors.title = "vui lòng nhập tiêu đề";
  }
  if (!data.description) {
    errors.description = "vui lòng nhập mô tả";
  }
  if (!data.content) {
    errors.content = "vui lòng nhập content";
  }
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
  validateBlog,
};
