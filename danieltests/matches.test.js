
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
    });


    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/futureSeasonGames/:teamName`,{
            teamName: "barcelona"
        });
        expect(res.status).toBe(200);
    });


    test("no argument season games",async () =>{
        res = await axios.get(`${localhost}/matches/pastSeasonGames/:teamName`,{
            teamName: "barcelona"
        });
        expect(res.status).toBe(200);
    });



////check more bad parameters
//describe("Bad paramters name requests",() =>{
    test("bad format update score with Union Rep permissions", async()=> {
        const test_user = {
            username:"adminUser1",
            password:"123456"
        };
        res = await axios.post(`${localhost}/Login`,{ //Login as admin user
            username: test_user.username,
            password: test_user.password
        });
        expect(res.status).toBe(201);

        res = await axios.put("/matches/updateScore",{
            match_i:"1213",
            homeScore:"1",
            awayScore:"2"
        });
        expect(res.status).toBe(400);
    });
//
//
    test("bad format update events with Union Rep permissions",async()=>{
        const test_user = {
            username:"adminUser1",
            password:"123456"
        };
        res = await axios.post(`${localhost}/Login`,{ //Login as admin user
            username: test_user.username,
            password: test_user.password
        });
        //expect(res.status).toBe(201);

        res = await axios.put("/matches/updateEvents",{
            match_i:"1213",
            events:"11/11/2021,11:12,60,Goal Lionel Messi"
        });
        expect(res.status).toBe(400);
    });


// good permission- admin user
test("try to add games with Union Rep permissions", async ()=>{

    const res = await axios.post(`${localhost}/Login`,{ //Login as regular user
        username:"adminUser1",
        password:"123456"
    });
    //expect(res.status).toBe(201);

    const test_match = {
        ID:"1",
        date:'2021-12-01',
        time:'12:51',
        homeTeam:"Barcelona",
        awayTeam:"Hijos de putas de los blancos",
        referee:"Mateo Leoz",
        stadium:"Camp Nout",
        scoreHome:6,
        scoreAway:2,
        events:"kicked their ass"
    };

    //try to add match
    res = await axios.post(`${localhost}/matches/newGame`,{test_match});
    expect(res.status).toBe(200); 
       //expect (reg_res.stausCode).toBe(200); //expect denied access for regular user
});


// bad permission - regualr user
test("try to add games without Union Rep permissions", async ()=>{

    const res = await axios.post(`${localhost}/Login`,{ //Login as regular user
        username:"regUser1",
        password:"123456"
    });

    const test_match = {
        ID:"1",
        date:'2021-12-01',
        time:'12:51',
        homeTeam:"Barcelona",
        awayTeam:"Hijos de putas de los blancos",
        referee:"Mateo Leoz",
        stadium:"Camp Nout",
        scoreHome:6,
        scoreAway:2,
        events:"kicked their ass"
    };

    res = await axios.post(`${localhost}/matches/newGame`,{test_match});
    expect(res.status).toBe(401);
    
    //expect (reg_res.stausCode).toBe(401); //expect denied access for regular user
 });