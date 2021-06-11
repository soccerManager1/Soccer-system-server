
//var server = request.agent('http://localhost:3000');
require("dotenv").config();
const matches = require("../server/service/matches");
const axios = require('axios');
const localhost = "http://localhost:3000";
const bcrypt = require("bcryptjs");

// maybe change syntax like the main tests == await axios.post(`${localhost}/Login`
/*
    test("good fetch season game",async () =>{
        res = await axios.get(`${localhost}/matches/allSeasonGames/:real madrid`);
        expect(res.status).toBe(400);
    });

*/
    // insert the two teams : real madrid and barcelona
    test("good fetch season game",async () =>{
       // try{
            res=await axios.get(`${localhost}/matches/futureSeasonGames/:barcelona`);
       // }
      //  catch(e){
      //      expect(e).toStrictEqual(Error('Request failed with status code 400'));
       // }
       expect(res.status).toBe(200);
            
    });
        


    test("no team name in past season games",async () =>{
        try{
            await axios.get(`${localhost}/matches/pastSeasonGames/:`);
        }
        catch(e){
            expect(e).toStrictEqual(Error('Request failed with status code 400'));
        }
       //expect(res.status).toBe(400);
             
            
    });



////check more bad parameters
//describe("Bad paramters name requests",() =>{
    test("bad format update score with Union Rep permissions", async()=> {
        await axios.post(`${localhost}/Login`,{ //Login as admin user
            username:'adminUser1',
            password:'123456'
        });
            try {
                //expect(res.status).toBe(200);
                await axios.put(`${localhost}/matches/updateScore`,{
                    match_id:"1213",
                    homeScore:"1",
                    awayScore:""
                });
              } catch (e) {
                expect(e).toStrictEqual(Error('Request failed with status code 500'));
              }
    });
//
//
    test("bad format update events with Union Rep permissions",async()=>{
        await axios.post(`${localhost}/Login`,{ //Login as admin user
            username:'adminUser1',
            password:'123456'
        });
        try {
            //expect(res.status).toBe(200);
            await axios.put(`${localhost}/matches/updateEvents`,{
                match_id:"1213",
                events:""
            });
          } catch (e) {
            expect(e).toStrictEqual(Error('Request failed with status code 500'));
          }
    });


// good permission- admin user
test("try to add games with Union Rep permissions", async ()=>{

    const res = await axios.post(`${localhost}/Login`,{ //Login as regular user
        username:"adminUser1",
        password:"123456"
    });
    //expect(res.status).toBe(201);

    //try to add match
       try {
        await axios.post(`${localhost}/matches/newGame`,{
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
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 404'));
      }
});


// bad permission - regualr user
test("try to add games without Union Rep permissions", async ()=>{

    try {
        await axios.post(`${localhost}/Login`,{ //Login as regular user
            username:"regUser1",
            password:"123456"
        });

        await axios.post(`${localhost}/matches/newGame`,{
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
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
      }
    });

    //expect (reg_res.stausCode).toBe(401); //expect denied access for regular user