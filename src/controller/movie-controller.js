const path = require("path")
const { Op } = require("sequelize");
const { Movie } = require("../models");
const {validateCreateMovie} = require("../validator/movie-validate")
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
        const value = validateCreateMovie({
            moviePic: req.file?.path,
            movieDes: req.body.movieDes,
            movieName: req.body.movieName,
            movieTrailer: req.body.movieTrailer
        })

        const movie = await Movie.create({
            moviePic: value.moviePic,
            movieDes: value.movieDes,
            movieName: value.movieName,
            movieTrailer: value.movieTrailer
        })
        res.status(201).json({ movie })
    }catch(err) {
        next(err)
    }
}

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      where: { id: req.params.movieId}
    })
    if (!movie) {
      createError("This movie not found", 400)
    }
    await movie.destroy()
    res.status(200).json({message: "Delete movie success"})
  }catch(err) {
    next(err)
  }
}
