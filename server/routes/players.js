var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");



router.get("/playersDetails/:playerName", async (req, res, next) => {
    try {
    const name = req.params.playerName;
    const players = await  players_utils.getPlayerbyName( name );
    res.status(200).send(players);

    } catch (error) {
      next(error);
    }
  });

module.exports = router;
