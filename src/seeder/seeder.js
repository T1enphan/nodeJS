const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();

async function main() {
  // Seed dữ liệu cho bảng User
  await prisma.country.createMany({
    data: [
      { name: "Việt Nam" },
      { name: "Mỹ" },
      { name: "Canada" },
      { name: "Hàn Quốc" },
      { name: "Nhật Bản" },
      { name: "Thái Lan" },
      { name: "Nga" },
      { name: "Lào" },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        name: "admin1",
        email: "admin1@gmail.com",
        phone: "0905012345",
        password: "123123",
        avatar: "chicken.jpg",
      },
      {
        name: "admin2",
        email: "admin2@gmail.com",
        phone: "0905012345",
        password: "123123",
        avatar: "chicken.jpg",
      },
      {
        name: "admin3",
        email: "admin3@gmail.com",
        phone: "0905012345",
        password: "123123",
        avatar: "chicken.jpg",
      },
      {
        name: "admin4",
        email: "admin4@gmail.com",
        phone: "0905012345",
        password: "123123",
        avatar: "chicken.jpg",
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        name: "Laptop",
        status: 1,
      },
      {
        name: "VGA",
        status: 1,
      },
      {
        name: "Main",
        status: 1,
      },
      {
        name: "Chip",
        status: 1,
      },
      {
        name: "Tai Nghe",
        status: 1,
      },
      {
        name: "Ram",
        status: 1,
      },
      {
        name: "GPU",
        status: 1,
      },
      {
        name: "Chuột",
        status: 1,
      },
      {
        name: "Bàn Phím",
        status: 1,
      },
    ],
  });

  await prisma.brand.createMany({
    data: [
      {
        name: "MSI",
        status: 1,
      },
      {
        name: "HP",
        status: 1,
      },
      {
        name: "ASUS",
        status: 1,
      },
      {
        name: "ROG",
        status: 1,
      },
      {
        name: "Logitech",
        status: 1,
      },
      {
        name: "Razer",
        status: 1,
      },
      {
        name: "Apple",
        status: 1,
      },
      {
        name: "AMD",
        status: 1,
      },
      {
        name: "Intel",
        status: 1,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
      {
        id_category: 4,
        id_brand: 4,
        id_user: 1,
        name: "test pp",
        image: "/uploads/image-1723184829273-555540839.png",
        price: 18000,
        status: 1,
        sale: 0,
        detail: "yasuo",
        company_profile: "phong vu",
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
