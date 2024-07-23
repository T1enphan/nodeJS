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
