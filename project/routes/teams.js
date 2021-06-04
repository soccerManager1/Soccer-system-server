var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const coach_utils = require("./utils/coaches_utils");

router.get("/teamFullDetails/:teamId", async (req, res, next) => {

  let team_details = [];
  try {
  
    const teamId = req.params.teamId;
    const team_coach = await coach_utils.getCoachbyTeamId(teamId);
    const team_players = await players_utils.getPlayersByTeam(teamId);
  

    //we should keep implementing team page.....
    res.send({
      team_coach: team_coach,
      team_players: team_players,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/getCoachByTeamId/:teamId", async (req, res, next) => {
  try {
  const id = req.params.teamId;
  const coach = await coach_utils.getCoachbyTeamId( id );
  res.status(200).send(coach);

  } catch (error) {
    next(error);
  }
});



module.exports = router;
