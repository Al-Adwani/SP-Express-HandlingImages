const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const { createShop, fetchShop, productCreate } = require("./shop.controller");

router.get("/", fetchShop);
router.post("/", upload.single("image"), createShop);

router.post("/:shopId/products", upload.single("image"), productCreate);
module.exports = router;
