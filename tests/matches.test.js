
require("dotenv").config();
const axios = require('axios');
const localhost = "http://localhost:3000";
var cookie = null;


    test("no team name in past season games",async () =>{
        try{
            await axios.get(`${localhost}/matches/pastSeasonGames/:`);
        }
        catch(e){
            expect(e).toStrictEqual(Error('Request failed with status code 400'));
        }
             
            
    });

/*
************************** USE CASE 5 - ADD GAMES ***********************************************
*/
test("try to add games with bad home team name", async ()=>{

    const res = await axios.post(`${localhost}/Login`,{ //Login as regular user
        username:"adminUser1",
        password:"123456"
    });

    //try to add match
       try {
            //console.log("cookie is:");
            //console.log(cookie);
        await axios.post(`${localhost}/matches/addFutureGame`,{
            date:'10/10/2021',
            time:'12:51',
            homeTeam:"Barcelona",
            awayTeam:"Hijos de putas de los blancos",
            referee:"Mateo Leoz",
            stadium:"Camp Nout",
            cookie: cookie
        })
        expect(res.status).toBe(401);
        
      } catch (e) {
     
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
    }
},50000);
//
//
//// bad permission - regualr user
    test("try to add games without Union Rep permissions", async ()=>{

        try {
            await axios.post(`${localhost}/Login`,{ //Login as regular user
                username:"Reguser2",
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


//try to add games with missing parameters - no referee
test("try to add games without parameters", async ()=>{

    try {
        const req=await axios.post(`${localhost}/Login`,{ //Login as admin user
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
        expect(e).toStrictEqual(Error('Request failed with status code 400'));
      }
    });



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



