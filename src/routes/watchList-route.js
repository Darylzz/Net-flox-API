const express = require("express")
const router = express.Router()
const watchListController = require("../controller/watchList-controller")

router.post("/:profileId/:movieId", watchListController.addWatchList)
router.get("/:profileId", watchListController.findWatchListByProfileId)
router.delete("/:watchlistId", watchListController.deleteWatchList)

module.exports = router