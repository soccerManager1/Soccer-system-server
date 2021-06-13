const match_utils= require("../server/domain/routes/matches_utils.js");

// add game tests 

// bad parameter
// **************************************** Unit Tests *************************************************

test("add future game with no parameter" , async() => {
    res = await match_utils.addFutureGame();
    expect (res).toBeUndefined();
});










