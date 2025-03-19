const express = require("express");
const router = express.Router();
const mathController = require("../controllers/mathController");

router.get("/add", mathController.addNumbers);

module.exports = router;
