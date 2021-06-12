const match_utils= require("../server/domain/routes/matches_utils.js");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
//const DButils = require("../");
//const matches_access = require("../../data/matchesAccess")
//const matches = require("../server/service/matches");
//const request = require('supertest');
//var server = request.agent('http://localhost:3000');



// add game tests 

// bad parameter
test("add future game with no parameter" , async() => {
    res = await match_utils.addFutureGame();
    expect (res).toBeUndefined();
});










