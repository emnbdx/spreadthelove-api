const express = require('express');
const controller = require("../controllers/message.js");
const router = express.Router();

router.post("/", controller.create);
router.get("/:id", controller.findOne);
router.get("/:receiverId", controller.findAllByReceiver);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;