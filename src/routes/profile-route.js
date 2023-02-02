const express = require("express")
const profileController = require("../controller/profile-controller")
const upload = require("../middlewares/upload")
const router = express.Router()

router.post("/", upload.single("profileImage"), profileController.createProfile)
router.delete("/:profileId", profileController.deleteProfile)

module.exports = router