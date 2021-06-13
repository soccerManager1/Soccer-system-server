const axios = require('axios');
const localhost = "http://localhost:3000";
require("dotenv").config();
jest.setTimeout(30000);

// **************************************** Regresion Test *************************************************

test("First Regression Test - updateScore non functional - system still operates",async () =>{
    try{
        // dummy function - should raise error
        await axios.get(`${localhost}/matches/regressionTest1`,{}); 
    }
    catch(e){
        //console.log(e);
        expect(e).toStrictEqual(Error('Request failed with status code 400'));
    }
})

//add function getAllFutureGames 
test("Second Regression Test - add functionaly: getAllFutureGames - system still operates", async()=>{
    res= await axios.get(`${localhost}/matches/getAllFutureGames`,{});
    expect(res.length).not.toBe(0);
})