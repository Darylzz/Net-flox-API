const Joi = require("joi")

const validate = require("./validate")

const registerSchema = Joi.object({
    email: Joi.string().email({tlds: false}).message({
        "any.required": "Email is required",
        "string.email": "Must be valid email",
        "string.empty": "Email is required"
    }),
    password: Joi.string().alphanum().min(6).required().trim().message({
        "string.empty": "Password is required",
        "string.alphanum": "Password must containnumber or alphabet",
        "string.min": "Password must have at least 6 characters"
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().trim().message({
        "any.only": "Password confirm password not match",
        "string.empty": "Confirm password is required"
    })
})

exports.validateRegister = validate(registerSchema)

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

exports.validateLogin = validate(loginSchema)