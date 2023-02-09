const express = require("express")
const router = express.Router()
const categoryController = require("../controller/category-controller")

router.get("/", categoryController.getAllCategory)
router.get("/:categoryId", categoryController.findCategoryById)

module.exports = router