var express = require("express");
var router = express.Router();
const DButils = require("../domain/routes/DButils");
const players_utils = require("../domain/routes/players_utils");
const matches_utils = require("../domain/routes/matches_utils");
const league_utils = require("../domain/routes/league_utils");
const users_access = require("../data/userAccess");
const users_utils = require("../domain/routes/users_utils");

function compareDates(d1, d2){
//  d1 > d2 false
  var parts_d1 =d1.split('/');
  var d1 = Number(parts_d1[2] + parts_d1[1] + parts_d1[0]);
  parts_d2 = d2.split('/');
  var d2 = Number(parts_d2[2] + parts_d2[1] + parts_d2[0]);
  //month
  if(parts_d1[0]<0 || parts_d1[0]>12 || parts_d2[0]<0 || parts_d2[0]>12)
    return false;
  //day
  if(parts_d1[1]<0 || parts_d1[1]>31 || parts_d2[1]<0 || parts_d2[1]>31)
    return false;
  //year
  if(parts_d1[2]<0|| parts_d2[20]<0)
    return false;
  return d1 <= d2;
  }




//middlewhere for add future games
router.use("/addFutureGame", async function (req, res, next) {
 
   // parameters exists
   // valid parameters

  const date = req.body.date;
  const time = req.body.time;
  const homeTeam = req.body.homeTeam;
  const awayTeam = req.body.awayTeam;
  const referee = req.body.referee;
  const stadium = req.body.stadium;
  
  if (!date || !time || !homeTeam || !awayTeam || !referee || !stadium ){
    res.status(400).send("all parameters are requird! ");
    return;
  }
  
  if( await users_utils.isUserAdmin(req.session.user_id) != true ){
    res.status(401).send("user not have permission ");
    return;
  }

  //check if is future game
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  let result=compareDates(date, today)
  


  if(result){
    res.status(400).send(" invalid date ");
    return;
  }
  
  const Hteam = await league_utils.getTeamByName(homeTeam); // check if Home team exist
  const Ateam = await league_utils.getTeamByName(awayTeam); // check if Away team exist

  if (!Hteam || !Ateam){
    res.status(400).send( " invalid teams names ");
    return 
  }

  const all_users = await users_access.getUserNames();

  try{

    if ( !(all_users.find((x) => x.username === referee))){
      res.status(400).send( "invalid referee name");
      return ;
    }
  }

  catch (error) {
   next(error);
  }
 
next();
 
 });


router.post("/addFutureGame", async (req, res, next) => {

  try {
  const gameDetails = req.body;
  bool = await matches_utils.addFutureGame( gameDetails );
  res.status(201).send("game added successfully");

  } catch (error) {
    next(error);
  }
});


router.use("/addPastGame", async function (req, res, next) {
 
  // parameters exists
  // valid parameters
  
 const date = req.body.date;
 const time = req.body.time;
 const homeTeam = req.body.homeTeam;
 const awayTeam = req.body.awayTeam;
 const referee = req.body.referee;
 const stadium = req.body.stadium;
 const scoreHome = req.body.scoreHome;
 const scoreAway = req.body.scoreAway;
 const events = req.body.events;
 
 if ( !date || !time || !homeTeam || !awayTeam || !referee || !stadium || !scoreHome || !scoreAway || !events ){
  res.status(400).send("all parameters are requird! ");
  return;
}

if( await users_utils.isUserAdmin(req.session.user_id) != true ){
  res.status(401).send("user not have permission ");
  return;
}

 //check if is future game
 var today = new Date();
 var dd = String(today.getDate()).padStart(2, '0');
 var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 var yyyy = today.getFullYear();
 today = mm + '/' + dd + '/' + yyyy;
 let result=compareDates(date, today)

 if(!result){
   res.status(400).send(" invalid date ");
   return;
 }
 
 const Hteam = await league_utils.getTeamByName(homeTeam); // check if Home team exist
 const Ateam = await league_utils.getTeamByName(awayTeam); // check if Away team exist

 if (!Hteam || !Ateam){
  res.status(400).send( " invalid teams names ");
  return ;
}


 const all_users = await users_access.getUserNames();


  try{
    if ( !(all_users.find((x) => x.username === referee)))
    res.status(400).send( "invalid referee name");
    return ;
  }

 catch (error) {
  next(error);
 }

next();

});



router.post("/addPastGame", async (req, res, next) => {
  try {
  const gameDetails = req.body;
  bool = await matches_utils.addPastGame( gameDetails );
  res.status(200).send("game added successfully");

  } catch (error) {
    next(error);
  }
});




  router.get("/pastSeasonGames/:teamName", async (req, res, next) => {
    
    try {
    const teamName = req.params.teamName;
    const matches = await  matches_utils.getPastGames( teamName );
    if(!teamName || teamName===":"){
 //     console.log("i am in the if in the pastSeasonGames :");
      res.status(400).send("no arguments given");
    }
    else
      res.status(200).send(matches);

    } catch (error) {
      next(error);
    }
  });

  router.get("/futureSeasonGames/:teamName", async (req, res, next) => {
    
    try {
    const teamName = req.params.teamName;
    const matches = await  matches_utils.getFutureGames( teamName );
    if(!teamName || teamName===":"){
 //     console.log("i am in the if in the pastSeasonGames :");
      res.status(400).send("no arguments given");
    }
    else
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

  router.get("/getAllFutureGames", async (req, res, next) => {
    
    try {
    const matches = await  matches_utils.getAllFutureGames();
    res.status(200).send(matches);

    } catch (error) {
      next(error);
    }
  });

  router.get("/regressionTest1",(req, res, next) => {
    try {
      res.status(400).send("test");
  
    } catch (error) {
      res.status(400).send("test");
    }
   });


module.exports = router;