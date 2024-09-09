const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

// Tạo transporter với cấu hình SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thinhtran210238@gmail.com",
    pass: "dcdfebzmzmtzdfqa",
  },
});

// Hàm đọc và compile template HTML với Handlebars
const compileTemplate = (templatePath, replacements) => {
  // Sử dụng path.resolve để lấy đường dẫn tuyệt đối từ __dirname
  const absolutePath = path.resolve(__dirname, templatePath);

  // Kiểm tra nếu file tồn tại trước khi đọc
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Template not found at path: ${absolutePath}`);
  }

  const template = fs.readFileSync(absolutePath, "utf-8");
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(replacements);
};

// Hàm gửi email với nội dung HTML động
const sendMailRegister = async (
  to,
  subject,
  text,
  templatePath,
  replacements
) => {
  try {
    // Render nội dung HTML với các giá trị thay thế
    const html = compileTemplate(templatePath, replacements);

    // Thiết lập thông tin email
    const info = await transporter.sendMail({
      from: '"Sender Name" <your-email@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMailRegister;
