const {WatchList} = require("../models")
const createError = require("../util/createError")
exports.addWatchList = async (req, res, next) => {
    try {
        const {movieId, profileId} = req.params
        const watchList = await WatchList.findOne({
            where: {
                profileId: profileId,
                movieId: movieId
            }
        })
        if (watchList) {
            createError("This profile already have this movie", 400)
        }
        const result = await WatchList.create({
            profileId: profileId,
            movieId: movieId
        })
        res.status(200).json({ result })
    }catch(err) {
        next(err)
    }
}

exports.findWatchListByProfileId = async (req, res, next) => {
    try {
        const watchList = await WatchList.findAll({
            where: {
                profileId: req.params.profileId
            }
        })
        res.status(200).json({ watchList })
    }catch(err) {
        next(err)
    }
}