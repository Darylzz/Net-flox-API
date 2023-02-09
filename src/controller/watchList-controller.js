const { WatchList, Movie } = require("../models");
const createError = require("../util/createError");
exports.addWatchList = async (req, res, next) => {
  try {
    const { movieId, profileId } = req.params;
    console.log(req.params);
    const watchList = await WatchList.findOne({
      where: {
        profileId: profileId,
        movieId: movieId,
      },
    });
    if (watchList) {
      createError("This profile already have this movie", 400);
    }
    const result = await WatchList.create({
      profileId: profileId,
      movieId: movieId,
    });
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.findWatchListByProfileId = async (req, res, next) => {
  try {
    const watchList = await WatchList.findAll({
      where: {
        profileId: req.params.profileId,
      },
      include: {
        model: Movie,
      },
    });
    res.status(200).json({ watchList });
  } catch (err) {
    next(err);
  }
};

exports.deleteWatchList = async (req, res, next) => {
  try {
    const watchList = await WatchList.findOne({
      where: {
        id: +req.params.watchlistId,
      },
    });
    if (!watchList) {
      createError("This watch list not match", 400);
    }
    if (watchList.profileId !== +req.query.profileid) {
      createError("You have no permission delete this movie", 403);
    }
    await watchList.destroy( {where: {id: watchList }});
    res.status(204).json({ watchList });
  } catch (err) {
    next(err);
  }
};
