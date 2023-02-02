const fs = require("fs")
const {validateCreateProfile} = require("../validator/profile-validate")
const createError = require("../util/createError")
exports.createProfile = async (req, res, next) => {
    try {
        const value = validateCreateProfile({
            title: req.body.title,
            image: req.files?.path
        })
        if (value.image) {
            value.image = await cloudinary.upload(value.image)
        }
        value.userId = req.user.id

        const profile = await Profile.create(value)
        res.status(201).json({profile})
    }catch(err) {
        next(err)
    }finally {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
    }
}

exports.deleteProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ where: {id: req.params.userId}})
        if (!profile) {
            createError("This profile not found", 400)
        }
        if (profile.userId !== req.user.id) {
            createError("You have no permission delete this profile", 403)
        }   
        await profile.destroy()
        res.status(204).json()
    }catch(err) {
        next(err)
    }
}