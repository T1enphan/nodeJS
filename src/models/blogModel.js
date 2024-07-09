const {PrismaClient} = require("../generated/client");
const prisma = new PrismaClient();

const createBlog = async(data) => {
    return prisma.blog.create({data})
}

const getAllBlog = async() =>{
    return prisma.blog.findMany();
}
const updateBlog = async(id, data)=>{
    return prisma.blog.update({where:{id},data});
};



// lấy thông tin cua blog + comment va thông tin user
const getBlogWithComments = async (blogId) => {
    try {
      // Lấy thông tin bài blog
      const blog = await prisma.blog.findUnique({
        where: {
          id: blogId,
        },
        include: {
          comments: {
            include: {
              user: true, // Nếu bạn muốn bao gồm thông tin người dùng của mỗi comment
            },
          },
        },
      });
       return blog;
    } catch (error) {
      throw new Error(`Error retrieving blog: ${error.message}`);
    }
}

module.exports ={
    createBlog,
    getAllBlog,
    updateBlog,
    getBlogWithComments
}