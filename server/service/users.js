var express = require("express");
var router = express.Router();
const DButils = require("../domain/routes/DButils");
const users_utils = require("../domain/routes/users_utils");
const players_utils = require("../domain/routes/players_utils");
const matches_utils = require("../domain/routes/matches_utils");
const users_access = require("../data/userAccess")

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    const user = await users_access.getUsersId();
    if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
        }
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
router.post("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const player_id = req.body.playerId;
    await users_utils.markPlayerAsFavorite(user_id, player_id);
    res.status(201).send("The player successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites players that were saved by the logged-in user
 */
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let favorite_players = {};
    const player_ids = await users_utils.getFavoritePlayers(user_id);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.player_id)); //extracting the players ids into array
    const results = await players_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});



router.post("/favoriteMatchs", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const match_id = req.body.match_id;
    await users_utils.markMatchAsFavorite(user_id, match_id );
    res.status(201).send("The match successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});


router.get("/favoriteMatchs", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let favorite_matches = {};
    const match_ids = await users_utils.getFavoriteMatches(match_id);
    let matchs_array = [];
    match_ids.map((match_id)=>{
      const match = matches_utils.getMatchById(match_id);
      if (match){matchs_array.push(match)}
    });

    res.status(200).send(matchs_array);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
