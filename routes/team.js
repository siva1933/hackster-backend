const express = require("express");
const router = express.Router();
const teamController = require("../controller/team");

router.post("/teams", teamController.addToTeams);
router.post("/teams/won", teamController.teamWon);
router.get("/teams", teamController.getTeams);

module.exports = router;
