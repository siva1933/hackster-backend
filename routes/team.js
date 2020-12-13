const express = require("express");
const router = express.Router();
const teamController = require("../controller/team");

router.get("/teams", teamController.getTeams);

module.exports = router;
