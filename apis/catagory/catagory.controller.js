const Category = require("../../db/models/Category");
const Product = require("../../db/models/Product");

exports.fetchCatagory = async (req, res, next) => {
  try {
    const catagoty = await Category.find().populate("product");
    return res.json(catagoty);
  } catch (error) {
    next(error);
  }
};

exports.createCatagory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCatagory = await Category.create(req.body);
    return res.status(201).json(newCatagory);
  } catch (error) {
    next(error);
  }
};
exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };

    const newProduct = await Product.create(req.body);
    await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { $push: { product: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
