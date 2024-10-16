const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();
// Hàm kiểm tra SUPER_ADMIN
const isSuperAdmin = async (superAdminId) => {
  if (!superAdminId) {
    throw new Error("SUPER_ADMIN ID is required.");
  }

  const superAdmin = await prisma.admin.findUnique({
    where: { id: superAdminId }, // Sử dụng id để tìm kiếm
  });

  if (!superAdmin || superAdmin.role !== "SUPER_ADMIN") {
    throw new Error("SUPER_ADMIN not found or role is not SUPER_ADMIN.");
  }

  return true; // Nếu là SUPER_ADMIN
};

const getTaskList = () => {
  return prisma.todo.findMany();
};

const deleteTask = (id) => {
  return prisma.todo.delete({ where: { id } });
};

const updateTask = (id, data) => {
  return prisma.todo.update({
    where: { id },
    data: {
      task: data.task,
      status: parseInt(data.status), // Chuyển thành số nguyên
      deadline: new Date(data.deadline), // Chuyển thành đối tượng Date
    },
  });
};

// Hàm tạo Todo
const createTodo = async (data) => {
  return prisma.todo.create({
    data: {
      task: data.task,
      status: parseInt(data.status), // Chuyển thành số nguyên
      deadline: new Date(data.deadline), // Chuyển thành đối tượng Date
      id_admin: parseInt(data.id_admin), // Chuyển thành số nguyên
    },
  });
};

const changeStatus = async (todoId) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new Error("Task not found!");
    }

    const newStatus = todo.status === 0 ? 1 : todo.status === 1 ? 2 : 0;

    const updateTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { status: newStatus },
    });

    return updateTodo;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error; // Ném lỗi lên để controller xử lý
  }
};

module.exports = {
  isSuperAdmin,
  createTodo,
  getTaskList,
  deleteTask,
  updateTask,
  changeStatus,
};
