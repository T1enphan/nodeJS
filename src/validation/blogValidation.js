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
  if (!file) {
    errors.image = "vui lòng thêm img";
  } else {
    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFormats.includes(file.mimetype)) {
      errors.image = "định dạng không hợp lệ";
    }
    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
      errors.image =
        "Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB";
    }
  }
  return errors;
};
module.exports = {
  validateBlog,
};
