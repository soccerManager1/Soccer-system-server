//import {auth} from '../server/service/auth';
const axios = require('axios');
//const { response, response } = require('express');
const localhost = "http://localhost:3000";
require("dotenv").config();
//let queryUser = null;
//const request = require('supertest');
//const app = require("../server/main");
//var user = request.agent(app);

jest.setTimeout(30000);

test("login a registered user" , async() => {
    res = await axios.post(`${localhost}/Login`,{ //Login as admin user
        username:'adminUser1',
        password:'123456'
    });
    expect(res.status).toBe(201);
});

//non existing user or passwords
test("Bad userName", async() =>{

    await axios.post(`${localhost}/Logout`,{});

    res = await axios.post(`${localhost}/Login`,{
        username:"Noone",
        password:"pass123"
    });
    //res is a promise?
    expect(res.status).toBe(401);

   });


test("bad password", async() =>{
    res = await axios.post(`${localhost}/Login`,{
        username:"adir",
        password:"bad password"
    });
    expect(res.status).toBe(401);
});


   //empty parametres
   test("empty parametres", async() =>{
       //req.session.reset();
       res = await axios.post(`${localhost}/Login`,{
           username:"",
           password:""
       });
       expect(res.status).toBe(401);
       //expect(res.status).toBe(401);
   });


 test("Try to Register an existing user with a taken username", async() =>{
     //req.session.reset();
     res = await axios.post(`${localhost}/Register`,{
        username:"adir1234567",
        firstname:"adir",
        lastname:"marom",
        country:"Yemen",
        password:"marom4567",
        email:"adir@gmail.com",
        imageUrl:"http://google.photos.myphoto=?adir?query=1",
        type:"regular"
     });
     expect(res.status).toBe(400);
     //expect(res.result).toBeUndefined();
 });

test("Try to Register an new user with non legal type field", async () =>{
    //req.session.reset();
    res = await axios.post(`${localhost}/Register`,{
        username:"dor",
        firstname:"dor",
        lastname:"test",
        country:"test",
        password:"test123",
        email:"adir@gmail.com",
        imageUrl:"http://google.photos.myphoto=?adir?query=1",
        type:"Non-legal type"
    });
    expect(res.status).toBe(400);
    //expect(res.result).toBeUndefined();
});


//describe("log out test", ()=>{
//    test("Succesfull logout", async()=>{
//        res=await server.post("/Logout");
//        expect(res.message.localeCompare("logout succeeded")===0);
//    },40000)
//})
// Register Accpetence 

