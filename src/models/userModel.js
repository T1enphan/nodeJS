const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();




// Tạo một người dùng mới
const createUser = async (data) => {
    // console.log(data);
 return prisma.user.create({ data });
};




module.exports = {
 createUser
};
