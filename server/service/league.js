var express = require("express");
var router = express.Router();
const league_utils = require("../domain/routes/league_utils");


router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.get("/currSeasonTeams", async (req, res, next) => {
  try {
    sorted =  req.body.sorted;
    const season = await league_utils.getTeams(sorted);
    res.send(season);
  } catch (error) {
    next(error);
  }
});





module.exports = router;
