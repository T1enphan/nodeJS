const validateTest = (data) => {
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
  if (!data.image) {
    errors.image = "vui lòng nhập img";
  }
  return errors;
};
module.exports = {
  validateTest,
};
