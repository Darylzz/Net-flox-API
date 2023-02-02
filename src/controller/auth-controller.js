const {
  validateRegister,
  validateLogin,
} = require("../validator/auth-validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../util/createError");
// const createError = require("")
exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: {
         email: value.email || "" 
      },
    });
    if (user) {
      createError("email is already in use", 400);
    }
    value.password = await bcrypt.hash(value.password, 12);
    console.log(1);
    await User.create(value);

    res
      .status(201)
      .json({ message: "register success, please log in to continue" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
    try {
      console.log(req.body);
        const value = validateLogin(req.body)

        const user = await User.findOne({
            where: {
                    email: value.email
            }
        })
        if (!user) {
            createError("Invalid Email or password1",400)
        }
        const isCorrect = await bcrypt.compare(value.password, user.password)
        if(!isCorrect) {
            createError("Invalid Email or password2",400)
        }

        const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            password: user.password
        },
        "QWERTY",
        {
            expiresIn: "7d"
        }
        )
        res.status(200).json({accessToken})
    }catch(err) {
        next(err)
    }
}
