const express = require('express');
const controller = require("../controllers/event.js");
const router = express.Router();

router.post("/", controller.create);
router.get("/:id", controller.findOne);
router.get("/:userId", controller.findAllByUser);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;