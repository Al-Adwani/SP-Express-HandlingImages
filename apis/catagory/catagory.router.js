const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const {
  createCatagory,
  fetchCatagory,
  productCreate,
} = require("./catagory.controller");

router.get("/", fetchCatagory);
router.post("/", upload.single("image"), createCatagory);

router.post("/:categoryId/products", upload.single("image"), productCreate);
module.exports = router;
