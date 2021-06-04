var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const matches_utils = require("./utils/matches_utils");


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

  router.post("/newGame", async (req, res, next) => {
    try {
    const gameDetails = req.body;
    bool = await  matches_utils.addFutureGame( gameDetails );
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
