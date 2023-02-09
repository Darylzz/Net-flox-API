const { Op } = require("sequelize");
const { Movie } = require("../models");
const createError = require("../util/createError");
exports.getAllMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findAll();
    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      where: {
        id: req.params.movieId,
      },
    });
    if (!movie) {
      createError("Not found this movie", 400);
    }
    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};

exports.getMovieByName = async (req, res, next) => {
  try {
    const { search } = req.body;
    const movie = await Movie.findAll({
      where: {
        movieName: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    if (!movie) {
      createError("Not found this movie");
    }
    res.status(200).json({ movie });
  } catch (err) {
    next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      moviePic: req.file?.path,
      movieDes: req.body.title,
      movieName: req.body.title,
      movieTrailer: req.body.title,
      categoryId: req.body.title,
    });
    res.status(201).json({ movie });
  } catch (err) {
    next(err);
  }
};
