const Joi = require("joi")

const validate = require("./validate")

const createMovie = Joi.object({
    moviePic: Joi.string().required(),
    movieDes: Joi.string().required(),
    movieName: Joi.string().required(),
    movieTrailer: Joi.string().required()
})

exports.validateCreateMovie = validate(createMovie)