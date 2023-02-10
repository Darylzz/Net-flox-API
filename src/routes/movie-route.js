const express = require("express");
const upload = require("../middlewares/upload")
const router = express.Router();
const movieController = require("../controller/movie-controller");

router.get("/", movieController.getAllMovie);
router.get("/moviename", movieController.getMovieByName)
router.get("/:movieId", movieController.getMovieById)
router.post("/", upload.single("moviePic"), movieController.createMovie)

module.exports = router;
