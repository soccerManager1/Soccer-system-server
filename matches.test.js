const app = require('./main')
var server = request.agent('http://localhost:3000');
require("dotenv").config();


describe(" bad fetch of all/past season games - no argument ", () =>{

    test("no argument season games",async () =>{
        res = await server.get("/matches/allSeasonGames/:teamName").send({
            teamName: ""
        });
        expect(res.statusCode).toBe(400);
    },3000)


    test("no argument season games",async () =>{
        res = await server.get("/matches/futureSeasonGames/:teamName").send({
            teamName: ""
        });
        expect(res.statusCode).toBe(400);
    },3000)


    test("no argument season games",async () =>{
        res = await server.get("/matches/pastSeasonGames/:teamName").send({
            teamName: ""
        });
        expect(res.statusCode).toBe(400);
    },3000)

})

//check more bad parameters
describe("Bad paramters name requests",() =>{
    test("bad format",async()=>{
        res= await server.put("/matches/updateScore").send({
            match_i: "1213",
            homeScore: "1",
            awayScore:"2"
        });
        expect(res.statusCode).toBe(400);
    },3000)

})