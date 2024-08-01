const productModel = require("../models/productModel");
const { uploadSingle, uploadArray } = require("../Middleware/uploadMiddleware");

// const createProduct = async (req, res) => {
//   uploadSingle(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }
//     const {
//       id_category,
//       id_brand,
//       id_user,
//       name,
//       price,
//       status,
//       sale,
//       detail,
//       company_profile,
//     } = req.body;
//     let data = req.body;
//     const imageFile = req.file;
//     data.id_category = parseInt(data.id_category, 10);
//     data.id_brand = parseInt(data.id_brand, 10);
//     data.id_user = parseInt(data.id_user, 10);

//     let imagePath = null;
//     if (imageFile) {
//       imagePath = `/uploads/${imageFile.filename}`;
//     }
//     console.log("====================================");
//     console.log(imagePath);
//     console.log("====================================");
//     // try {
//     //   const product = await productModel.creatProduct({
//     //     id_category,
//     //     id_brand,
//     //     id_user,
//     //     name,
//     //     price,
//     //     status,
//     //     sale,
//     //     detail,
//     //     company_profile,
//     //     image: imagePath,
//     //   });
//     //   res.json(product);
//     // } catch (error) {
//     //   res.status(500).json({ error: "Error creating product" }, error);
//     // }
//   });
// };

const createProduct = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const {
      id_category,
      id_brand,
      id_user,
      name,
      price,
      status,
      sale,
      detail,
      company_profile,
    } = req.body;

    const imageFile = req.file;

    if (
      !id_category ||
      !id_brand ||
      !id_user ||
      !name ||
      !price ||
      !status ||
      !sale ||
      !detail ||
      !company_profile
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let imagePath = null;
    if (imageFile) {
      imagePath = `/uploads/${imageFile.filename}`;
    }

    // Ghi log các giá trị trước khi gọi creatProduct
    console.log({
      id_category: parseInt(id_category, 10),
      id_brand: parseInt(id_brand, 10),
      id_user: parseInt(id_user, 10),
      name,
      price,
      status,
      sale,
      detail,
      company_profile,
      image: imagePath,
    });

    try {
      const product = await productModel.creatProduct({
        id_category: parseInt(id_category, 10),
        id_brand: parseInt(id_brand, 10),
        id_user: parseInt(id_user, 10),
        name,
        price,
        status,
        sale,
        detail,
        company_profile,
        image: imagePath,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Error creating product" }, error);
    }
  });
};

module.exports = {
  createProduct,
};
