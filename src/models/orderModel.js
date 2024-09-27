const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

async function createOrder(email, productIds, quantities) {
  // Lấy thông tin sản phẩm từ database dựa trên productIds
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(Number), // Chuyển id thành số
      },
    },
    select: {
      id: true, // Đảm bảo rằng id có trong response
      name: true,
      price: true,
    },
  });

  // Tính tổng giá trị đơn hàng
  const total = products.reduce(
    (acc, product, index) => acc + product.price * quantities[index],
    0
  );

  // Tạo đơn hàng trong database
  const order = await prisma.order.create({
    data: {
      email,
      total,
      id_user: 1, // Cập nhật id_user tương ứng với người dùng thực
    },
  });

  // Tạo bản ghi trong bảng OrderProduct để lưu thông tin sản phẩm và đơn hàng
  await Promise.all(
    products.map((product, index) =>
      prisma.orderProduct.create({
        data: {
          orderId: order.id, // Sử dụng order.id được tạo ra
          productId: product.id, // Sử dụng product.id từ sản phẩm
          quantity: quantities[index], // Thêm số lượng từ mảng quantities
        },
      })
    )
  );

  // Thêm số lượng cho từng sản phẩm trong response
  const productsWithQuantity = products.map((product, index) => ({
    ...product,
    quantity: quantities[index],
    total: product.price * quantities[index],
  }));

  return { order, products: productsWithQuantity };
}

module.exports = {
  createOrder,
};
