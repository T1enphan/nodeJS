const {PrimaClient} = require("../generated/client")
const prisma = new PrimaClient()


const createComment = async (data) =>{
    return prisma.Comment.create({data});
}

module.exports ={
    createComment
}