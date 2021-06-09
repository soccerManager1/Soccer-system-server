
//var server = request.agent('http://localhost:3000');
require("dotenv").config();
const matches = require("../server/service/matches");
const axios = require('axios');
const localhost = "http://localhost:3000";
const bcrypt = require("bcryptjs");

// maybe change syntax like the main tests == await axios.post(`${localhost}/Login`

    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/allSeasonGames/:teamName`,{
            teamName: ""
        });
        expect(res.status).toBe(200);
    },10000);


    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/futureSeasonGames/:teamName`,{
            teamName: ""
        });
        expect(res.status).toBe(200);
    },40000);


    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/pastSeasonGames/:teamName`,{
            teamName: ""
        });
        expect(res.status).toBe(200);
    },40000);



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
test("try to add games with Union Rep permissions", async ()=>{

    const pass="123"
    let hash_password = bcrypt.hashSync(pass,parseInt(process.env.bcrypt_saltRounds));
    const test_user = {
        username: "userAdmin1",
        password: hash_password
    };
    const test_match = {
        ID:"1" ,
        date : '2021-12-01',
        time: '12:51',
        homeTeam: "Barcelona",
        awayTeam: "Hijos de putas de los blancos",
        referee : "Mateo Leoz",
        stadium: "Camp Nout",
        scoreHome: 6,
        scoreAway: 2,
        events: "kicked their ass"
    };

    const login_res = await axios.post(`${localhost}/Login`,{ //Login as regular user
        username: test_user.username,
        password: test_user.password
    });
    console.log("I am connected");

    //try to add match
    const reg_res = await axios.post(`${localhost}/matches/newGame`,{test_match});
    expect (reg_res.stausCode).toBe(200); //expect denied access for regular user
},40000);