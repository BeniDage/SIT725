const express = require("express");
const router = express.Router();

router.use("/math", require("./math"));

module.exports = router;
