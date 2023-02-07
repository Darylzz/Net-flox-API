const Joi = require("joi")

const validate = require("./validate")

const createProfile = Joi.object({
    title: Joi.string().trim(),
    image: Joi.string().trim()
}).or("title","image")


exports.validateCreateProfile = validate(createProfile)