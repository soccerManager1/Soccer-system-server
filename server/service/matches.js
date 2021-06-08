var express = require("express");
var router = express.Router();
const DButils = require("../domain/routes/DButils");
const players_utils = require("../domain/routes/players_utils");
const matches_utils = require("../domain/routes/matches_utils");
const league_utils = require("../domain/routes/league_utils");
const users_access = require("../data/userAccess");



//middlewhere for add future games
router.use("/addFutureGame", async function (req, res, next) {

  console.log("in the middleware")
 
   // parameters exists
   // valid parameters
   
  console.log(req.body)
  const ID = req.body.ID;
  const date = req.body.date;
  const time = req.body.time;
  const homeTeam = req.body.homeTeam;
  const awayTeam = req.body.awayTeam;
  const referee = req.body.referee;
  const stadium = req.body.stadium;
  
  if (!ID || !date || !time || !homeTeam || !awayTeam || !referee || !stadium ){
    throw {
      status: 400,
      massege: "all parameters are requird!"
    }
  }
  //check if is future game
  var today = new Date();
  if( date > today.getDate() ){
   throw {
     status: 400,
     massege: " invalid date "
   }
  }
  
  const Hteam = await league_utils.getTeamByName(homeTeam); // check if Home team exist
  const Ateam = await league_utils.getTeamByName(awayTeam); // check if Away team exist

  if (!Hteam || !Ateam){
    throw {
      status: 400,
      massege: " invalid teams names "
    }
  }

  const all_users = await users_access.getUserNames();
  console.log(all_users)
  try{
    if ( !(all_users.find((x) => x.username === referee)))
      throw { status: 409, message: "invalid referee name" };
  }

  catch (error) {
   next(error);
  }
 
next();
 
 });


router.post("/addFutureGame", async (req, res, next) => {
  try {
  console.log("in the funccccccccccccccc")
  const gameDetails = req.body;
  bool = await matches_utils.addFutureGame( gameDetails );
  res.status(200).send("game added successfully");

  } catch (error) {
    next(error);
  }
});


router.get("/allSeasonGames/:teamName", async (req, res, next) => {
    
    try {
    const teamName = req.params.teamName;
    const matches = await  matches_utils.getGames( teamName );
    res.status(200).send(matches);

    } catch (error) {
      next(error);
    }
  });

  router.get("/pastSeasonGames/:teamName", async (req, res, next) => {
    
    try {
    const teamName = req.params.teamName;
    const matches = await  matches_utils.getPastGames( teamName );
    res.status(200).send(matches);

    } catch (error) {
      next(error);
    }
  });

  router.get("/futureSeasonGames/:teamName", async (req, res, next) => {
    
    try {
    const teamName = req.params.teamName;
    const matches = await  matches_utils.getFutureGames( teamName );
    res.status(200).send(matches);

    } catch (error) {
      next(error);
    }
  });


  router.put("/updateScore", async (req, res, next) => {
    try {
    const match_id = req.body.match_id;
    const homeScore = req.body.homeScore;
    const awayScore = req.body.awayScore;

    await  matches_utils.updateScore( match_id, homeScore, awayScore );
    res.status(200).send("updated");

    } catch (error) {
      next(error);
    }
  });


  router.put("/updateEvents", async (req, res, next) => {
    try {
    const match_id = req.body.match_id;
    const events = req.body.events;

    await  matches_utils.updateEvents( match_id, events );
    res.status(200).send("updated");

    } catch (error) {
      next(error);
    }
  });

   router.get("/futureSeasonGames/:teamName", async (req, res, next) => {
    
    try {
    const teamName = req.params.teamName;
    const matches = await  matches_utils.getFutureGames( teamName );
    res.status(200).send(matches);

    } catch (error) {
      next(error);
    }
  });

  router.post("/find", async (req, res, next) => {
    try {
    const gameDetails = req.body;
    bool = await  matches_utils.addFutureGame( gameDetails );
    res.status(200).send(matches);

    } catch (error) {
      next(error);
    }
  });


module.exports = router;
