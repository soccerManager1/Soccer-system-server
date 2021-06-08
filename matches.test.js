const app = require('./main')
var server = request.agent('http://localhost:3000');
require("dotenv").config();
const matches = require("../server/service/matches");


// maybe change syntax like the main tests == await axios.post(`${localhost}/Login`

describe(" bad fetch of all/past season games - no argument ", () =>{

    test("no argument season games",async () =>{
        res = await server.get("/matches/allSeasonGames/:teamName").send({
            teamName: ""
        });
        expect(res.statusCode).toBe(400);
    },40000);


    test("no argument season games",async () =>{
        res = await server.get("/matches/futureSeasonGames/:teamName").send({
            teamName: ""
        });
        expect(res.statusCode).toBe(400);
    },40000);


    test("no argument season games",async () =>{
        res = await server.get("/matches/pastSeasonGames/:teamName").send({
            teamName: ""
        });
        expect(res.statusCode).toBe(400);
    },40000);

});


////check more bad parameters
//describe("Bad paramters name requests",() =>{
//    test("bad format update score",async()=>{
//        res= await server.put("/matches/updateScore").send({
//            match_i: "1213",
//            homeScore: "1",
//            awayScore:"2"
//        });
//        expect(res.statusCode).toBe(400);
//    },40000);
//
//
//    test("bad format update events ",async()=>{
//        res= await server.put("/matches/updateEvents").send({
//            match_i: "1213",
//            events: "11/11/2021,11:12,60,Goal Lionel Messi"
//        });
//        expect(res.statusCode).toBe(400);
//    },40000);
//});

// no permission- regular user
test("try to add games without Union Rep permissions", async ()=>{
    const test_user = {
        username: "adir",
        password: "adir",
    };
    const test_match = {
        ID:"1" ,
        date : "12/12/2021",
        time: "12:51",
        homeTeam: "Barcelona",
        awayTeam: "Hijos de putas de los blancos",
        stadium: "Camp Nout"
    };
    const login_res = await server.post("/Login").send({ //Login as regular user
        username: test_user.username,
        password: test_user.password
    }); 

    //try to add match
    const reg_res = await matches.post("/newGame").send(test_match);
    expect (reg_res.stausCode).toBe(400); //expect denied access for regular user
});