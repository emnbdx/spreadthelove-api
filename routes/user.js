const express = require('express');
const controller = require("../controllers/user.js");
const router = express.Router();

router.post("/register", controller.create);
router.post("/login", controller.login);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;