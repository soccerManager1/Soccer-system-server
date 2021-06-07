var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const coach_utils = require("./utils/coaches_utils");


router.get("/getCoach/:coachId", async (req, res, next) => {
    try {
    const id = req.params.coachId;
    const coache = await  coach_utils.getCoachbyId( id );
    res.status(200).send(coache);

    } catch (error) {
      next(error);
    }
  });


module.exports = router;
