const todoModel = require("../models/todoModel");
const adminModel = require("../models/adminModel");

const createTodo = async (req, res) => {
  try {
    const { superAdminId, id_admin, task, status, deadline } = req.body;

    if (!superAdminId) {
      return res.status(400).json({
        message: "SUPER_ADMIN ID is required.",
      });
    }

    // Kiểm tra xem superAdminId có phải SUPER_ADMIN không
    await todoModel.isSuperAdmin(superAdminId);

    // Gọi model để tạo Todo
    const todo = await todoModel.createTodo({
      task,
      status,
      deadline,
      id_admin,
    });

    res.status(200).json({
      message: "Todo created successfully!",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create todo",
      error: error.message,
    });
  }
};

const getTaskList = async (req, res) => {
  try {
    const task = await todoModel.getTaskList();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await todoModel.deleteTask(id);
    res.status(200).json({
      message: "Delete task successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { task, status, deadline } = req.body;
    const taskEdit = await todoModel.updateTask(id, {
      task,
      status: parseInt(status, 10),
      deadline,
    });
    res.status(200).json({
      taskEdit,
      message: "Edit task successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const todoId = parseInt(req.params.id); //todoId bên model để vậy
    if (isNaN(todoId)) {
      return res.status(400).json({
        message: "invalid tash ID",
      });
    }

    const updateStatus = await todoModel.changeStatus(todoId);
    res.json({
      message: "Status updated successfully",
      todo: updateStatus,
    });
  } catch (error) {
    if (error.message === "Task  not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getModeratorsAndAdmins = async (req, res) => {
  try {
    // Lấy danh sách các tài khoản MODERATOR và ADMIN từ model
    const admins = await adminModel.getModeratorsAndAdmins();

    res.status(200).json({
      message: "Admins retrieved successfully",
      admins,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTodo,
  getTaskList,
  getModeratorsAndAdmins,
  deleteTask,
  updateTask,
  changeStatus,
};
