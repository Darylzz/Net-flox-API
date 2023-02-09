const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie-controller");

router.get("/", movieController.getAllMovie);
router.get("/:movieId", movieController.getMovieById)
router.post("/", movieController.createMovie)

module.exports = router;
