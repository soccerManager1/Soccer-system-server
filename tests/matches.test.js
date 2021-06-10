
//var server = request.agent('http://localhost:3000');
require("dotenv").config();
const matches = require("../server/service/matches");
const axios = require('axios');
const localhost = "http://localhost:3000";
const bcrypt = require("bcryptjs");

// maybe change syntax like the main tests == await axios.post(`${localhost}/Login`

    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/allSeasonGames/:teamName`,{
            teamName: "real madrid"
        });
        expect(res.status).toBe(200);
    },10000);


    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/futureSeasonGames/:teamName`,{
            teamName: "barcelona"
        });
        expect(res.status).toBe(200);
    },40000);


    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/pastSeasonGames/:teamName`,{
            teamName: "barcelona"
        });
        expect(res.status).toBe(200);
    },40000);



////check more bad parameters
//describe("Bad paramters name requests",() =>{
    test("bad format update score",async()=>{
        res= await axios.put("/matches/updateScore",{
            match_i: "1213",
            homeScore: "1",
            awayScore:"2"
        });
        expect(res.statusCode).toBe(400);
    },40000);
//
//
    test("bad format update events ",async()=>{
        res = await axios.put("/matches/updateEvents",{
            match_i: "1213",
            events: "11/11/2021,11:12,60,Goal Lionel Messi"
        });
        expect(res.statusCode).toBe(400);
    },40000);


// good permission- admin user
test("try to add games with Union Rep permissions", async ()=>{

    const pass="123"
    //let hash_password = bcrypt.hashSync(pass,parseInt(process.env.bcrypt_saltRounds));
    const test_user = {
        username: "newadmin",
        password: "123"
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

    await axios.post(`${localhost}/Login`,{ //Login as regular user
        username: test_user.username,
        password: test_user.password
    });
    //console.log("I am connected");

    //try to add match
    await axios.post(`${localhost}/matches/newGame`,{test_match})
    .then((res) => expect(res.status).toBe(200));    //expect (reg_res.stausCode).toBe(200); //expect denied access for regular user
},40000);


// bad permission - regualr user
test("try to add games without Union Rep permissions", async ()=>{

    //const pass="123"
    //let hash_password = bcrypt.hashSync(pass,parseInt(process.env.bcrypt_saltRounds));
    const test_user = {
        username: "regularUser",
        password: "123"
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

    await axios.post(`${localhost}/Login`,{ //Login as regular user
        username: test_user.username,
        password: test_user.password
    });
    //try to add match
    await axios.post(`${localhost}/matches/newGame`,{test_match})
    .then((res) => expect(res.status).toBe(401));;
    //expect (reg_res.stausCode).toBe(401); //expect denied access for regular user
 },40000);