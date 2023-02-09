const {Category} = require("../models")
const createError = require("../util/createError")

exports.getAllCategory = async (req, res, next) => {
    try{
        const category = await Category.findAll()
        res.status(200).json({ category })
    }catch(err) {
        next(err)
    }
}

exports.findCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.categoryId
            }
        })
        if (!category) {
            createError("This category not match")
        }
        res.status(200).json({ category })
    }catch(err) {
        next(err)
    }
}
