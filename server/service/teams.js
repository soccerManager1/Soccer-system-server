var express = require("express");
var router = express.Router();
const DButils = require("../domain/routes/DButils");
const players_utils = require("../domain/routes/players_utils");
const coach_utils = require("../domain/routes/coaches_utils");


function sortPlayers(players){
  if (!player){return}
  players = team_players.sort(function(player1, player2){
    if(player2.name < player1.name) { return -1; }
    if(player2.name > player1.name) { return 1; }
    return 0;
  })
  return players;
}

router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  console.log("***************************************************************")
  const sorted = req.body.sorted;
  const filter = req.body.filter;
  let team_details = [];
  try {
  
    const teamId = req.params.teamId;
    const team_coach = await coach_utils.getCoachbyTeamId(teamId);
    const team_players = await players_utils.getPlayersByTeam(teamId);

    if (sorted)
      team_players = sortPlayers(team_players);
    //this function sort the players
    

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
