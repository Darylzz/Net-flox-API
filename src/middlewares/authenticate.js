const createError = require("../util/createError")

module.exports = async (req, res, next) => {
    try {
        const {authorization} = req.headers
        if (!authorization) {
            createError("you are unauthorized", 401)
        }   
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, "QWERTY")
        const user = await User.findOne({
            where: {
                id: payload.id
            },
            attributes: {
                exclude: ["password"]
            }
        })
        if (!user) {
            createError("you are unauthorized", 401)
        }
        req.user= user
        next()
    }catch(err) {
        next(err)
    }
}