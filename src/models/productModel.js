const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

const creatProduct = async (data) => {
  return prisma.product.create({ data });
};

const updateProduct = async (id, data) => {
  return prisma.product.update({ where: { id }, data });
};

const getDataProduct = () => {
  return prisma.product.findMany();
};

const deleteProduct = async (id) => {
  return prisma.product.delete({ where: { id } });
};
async function searchProducts(query) {
  try {
    const lowerCaseQuery = query.toLowerCase();
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: lowerCaseQuery,
              // Lưu ý: Không sử dụng mode ở đây
            },
          },
          {
            detail: {
              contains: lowerCaseQuery,
              // Lưu ý: Không sử dụng mode ở đây
            },
          },
          {
            company_profile: {
              contains: lowerCaseQuery,
              // Lưu ý: Không sử dụng mode ở đây
            },
          },
        ],
      },
      include: {
        brand: true,
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.error(error);
    throw new Error("Error during product search");
  }
}
const changeStatus = async (productId) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const newStatus = product.status === 1 ? 0 : 1;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { status: newStatus },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product status:", error);
    throw error; // Ném lỗi lên để controller xử lý
  }
};
const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  creatProduct,
  deleteProduct,
  updateProduct,
  getDataProduct,
  searchProducts,
  changeStatus,
  getProductById,
};
