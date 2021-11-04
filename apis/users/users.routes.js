const express = require("express");
const router = express.Router();
const { signup } = require("./users.controller");

router.post("/", signup);

module.exports = router;
