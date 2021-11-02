const Shop = require("../../db/models/Shop");
const Product = require("../../db/models/Product");

exports.fetchShop = async (req, res, next) => {
  try {
    const shop = await Shop.find().populate("product");
    return res.json(shop);
  } catch (error) {
    next(error);
  }
};

exports.createShop = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};
exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const shopId = req.params.shopId;
    req.body = { ...req.body, shop: shopId };

    const newProduct = await Product.create(req.body);
    await Shop.findOneAndUpdate(
      { _id: req.params.shopId },
      { $push: { product: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
