const { createOrder } = require("../models/orderModel");
const sendMailRegister = require("../SendMail/sendMail");

async function sendBill(req, res) {
  const { email, cart } = req.body; // Dữ liệu giỏ hàng từ client
  const user = req.user; // Lấy thông tin người dùng từ req

  try {
    // // Kiểm tra thông tin người dùng
    if (!user || !user.name || !user.email || !user.address) {
      console.error("Missing user information:", user); // Ghi log thông tin người dùng để kiểm tra
      return res.status(400).json({ error: "User information is missing." });
    }

    // Lấy danh sách productIds và số lượng từ cart
    const productIds = Object.keys(cart); // Mảng id sản phẩm
    const quantities = Object.values(cart); // Mảng số lượng tương ứng

    // Tạo đơn hàng bằng cách gọi đến model
    const { order, products } = await createOrder(
      email,
      productIds,
      quantities
    );

    // Tính tổng giá trị đơn hàng
    const grandTotal = products.reduce(
      (total, product) => total + product.total,
      0
    );

    // Chuẩn bị dữ liệu thay thế cho template
    const replacements = {
      date: new Date().toLocaleDateString(),
      customerName: user.name, // Sử dụng thông tin từ req.user
      customerEmail: user.email,
      customerPhone: user.phone,
      customerAddress: user.address || "No address provided", // Thay bằng địa chỉ khách hàng
      products: products.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price.toFixed(2),
        total: (product.price * product.quantity).toFixed(2),
      })),
      grandTotal: grandTotal.toFixed(2),
    };

    // Gọi hàm gửi email
    await sendMailRegister(
      email, // Gửi tới email khách hàng
      "Your Invoice", // Tiêu đề email
      "Your invoice details", // Nội dung text email (plain text)
      "./templateBill.hbs", // Đường dẫn tới template HTML
      replacements // Thông tin thay thế trong template
    );

    console.log(`Invoice sent to: ${email}`); // Ghi log email đã gửi

    // Phản hồi thành công
    res.status(200).send("Invoice sent successfully");
  } catch (error) {
    console.error("Error sending invoice:", error); // Ghi log lỗi chi tiết
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  sendBill,
};
