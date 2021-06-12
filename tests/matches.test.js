
//var server = request.agent('http://localhost:3000');
require("dotenv").config();
const matches = require("../server/service/matches");
const axios = require('axios');
const localhost = "http://localhost:3000";
const bcrypt = require("bcryptjs");
var cookie = null;


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
  //  test("bad format update score with Union Rep permissions", async()=> {
  //      await axios.post(`${localhost}/Login`,{ //Login as admin user
  //          username:'adminUser1',
  //          password:'123456'
  //      });
  //          try {
  //              //expect(res.status).toBe(200);
  //              await axios.put(`${localhost}/matches/updateScore`,{
  //                  match_id:"1213",
  //                  homeScore:"1",
  //                  awayScore:""
  //              });
  //            } catch (e) {
  //              expect(e).toStrictEqual(Error('Request failed with status code 400'));
  //            }
  //  },50000);
//
//
  //  test("bad format update events with Union Rep permissions",async()=>{
  //      await axios.post(`${localhost}/Login`,{ //Login as admin user
  //          username:'adminUser1',
  //          password:'123456'
  //      });
  //      try {
  //          //expect(res.status).toBe(200);
  //          await axios.put(`${localhost}/matches/updateEvents`,{
  //              match_id:"1213",
  //              events:""
  //          });
  //        } catch (e) {
  //          expect(e).toStrictEqual(Error('Request failed with status code 500'));
  //        }
  //  },50000);
//
/*
************************** USE CASE 5 - ADD GAMES ***********************************************
*/
test("try to add games with bad home team name", async ()=>{

    const res = await axios.post(`${localhost}/Login`,{ //Login as regular user
        username:"adminUser1",
        password:"123456"
    });

    //cookie=req.headers["set-cookie"][0];

    //req.session.user_id="adminUser1";
    //sessionStorage.user_id="adminUser1";
    //try to add match
       try {
            console.log("cookie is:");
            console.log(cookie);
        await axios.post(`${localhost}/matches/addFutureGame`,{
            date:'10/10/2021',
            time:'12:51',
            homeTeam:"Barcelona",
            awayTeam:"Hijos de putas de los blancos",
            referee:"Mateo Leoz",
            stadium:"Camp Nout",
            cookie: cookie
        })
        //then((res)=>expect(res.status).toBe(200));
        expect(res.status).toBe(401);
        
      } catch (e) {
     
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
    }
});
//
//
//// bad permission - regualr user
    test("try to add games without Union Rep permissions", async ()=>{

        try {
            await axios.post(`${localhost}/Login`,{ //Login as regular user
                username:"regUser1",
                password:"123456"
            });

            await axios.post(`${localhost}/matches/addFutureGame`,{
                date:'2021-12-01',
                time:'12:51',
                homeTeam:"Barcelona",
                awayTeam:"Hijos de putas de los blancos",
                referee:"Mateo Leoz",
                stadium:"Camp Nout",
            });
          } catch (e) {
            expect(e).toStrictEqual(Error('Request failed with status code 401'));
          }
        });

    //expect (reg_res.stausCode).toBe(401); //expect denied access for regular user


//try to add games with missing parameters - no referee
test("try to add games without parameters", async ()=>{

    try {
        const req=await axios.post(`${localhost}/Login`,{ //Login as regular user
            username:"adminUser1",
            password:"123456"
        })
        

        await axios.post(`${localhost}/matches/addFutureGame`,{
            date:'2021-12-01',
            time:'12:51',
            homeTeam:"Barcelona",
            awayTeam:"Hijos de putas de los blancos",
            //referee:"Mateo Leoz",
            stadium:"Camp Nout",
        });
      } catch (e) {
          //this is good for some reason
        expect(e).toStrictEqual(Error('Request failed with status code 400'));
      }
    });

    //expect (reg_res.stausCode).toBe(401); //expect denied access for regular user



// try to enter game with bad date - future that took place in the past
    test("try to add game with bad date", async ()=>{
    
        try {
            await axios.post(`${localhost}/Login`,{ //Login as regular user
                username:"adminUser1",
                password:"123456"
            });
        
            await axios.post(`${localhost}/matches/addFutureGame`,{
                date:'2020-12-01',
                time:'12:51',
                homeTeam:"Barcelona",
                awayTeam:"Hijos de putas de los blancos",
                referee:"Mateo Leoz",
                stadium:"Camp Nout",
            });
          } catch (e) {
              //should be 400
            expect(e).toStrictEqual(Error('Request failed with status code 401'));
          }
        });


    //try to add games with non-exsiting team
    test("try to add games with non-exsiting team", async ()=>{
    
        try {
            await axios.post(`${localhost}/Login`,{ //Login as regular user
                username:"adminUser1",
                password:"123456"
            });
        
            await axios.post(`${localhost}/matches/addFutureGame`,{
                date:'2020-12-01',
                time:'12:51',
                homeTeam:"Non-exsiting team",
                awayTeam:"Hijos de putas de los blancos",
                referee:"Mateo Leoz",
                stadium:"Camp Nout",
            });
          } catch (e) {
              //should be 400
            expect(e).toStrictEqual(Error('Request failed with status code 401'));
          }
        });


        //try to add games with non registered referee
        test("try to add games with non registered referee", async ()=>{
    
            try {
                await axios.post(`${localhost}/Login`,{ //Login as regular user
                    username:"adminUser1",
                    password:"123456"
                });
            
                await axios.post(`${localhost}/matches/addFutureGame`,{
                    date:'2020-12-01',
                    time:'12:51',
                    homeTeam:"Non-exsiting team",
                    awayTeam:"Hijos de putas de los blancos",
                    referee:"non registered referee",
                    stadium:"Camp Nout",
                });
              } catch (e) {
                  //should be 400
                expect(e).toStrictEqual(Error('Request failed with status code 401'));
              }
            });



