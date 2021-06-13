const matchesAccessUtil = require("../server/data/matchesAccess.js");
//var server = request.agent('http://localhost:3000');


//Assuming user name with the following details is in the DB
test("bad fetch of non existing matches",async () =>{
    const bad_matches = await matchesAccessUtil.getAllMatchesByTeam("non_exsiting");
    expect (bad_matches.length).toBe(0) ;
},40000);

test("existing matches",async () =>{
    const matches = await matchesAccessUtil.getAllMatches();
    expect (matches.length).not.toBe(0) ;
},40000);


test("existing user info",async () =>{
    const bad_matches = await matchesAccessUtil.getMatchesById("12");
    expect (bad_matches.length).toBe(0) ;
},40000);
