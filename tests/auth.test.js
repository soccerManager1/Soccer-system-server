//import {auth} from '../server/service/auth';
const axios = require('axios');
//const { response, response } = require('express');
const localhost = "http://localhost:3000";
require("dotenv").config();
//let queryUser = null;
//const request = require('supertest');
//const app = require("../server/main");
//var user = request.agent(app);

test("login a registered user" , async() => {
    await axios.post(`${localhost}/Login`,{
        username: 'newadmin',
        password: '123'
    }).then((res) => expect(res.status).toBe(200));
    //expect(checkUser(queryUser)).toBe(true);

}, 50000)

//non existing user or passwords
   test("Bad userName", () =>{
           res= axios.post(`${localhost}/Login`,{
           username: "No one",
           password: "pass123"
           });
      //res is a promise?
       expect(res.result).toBeUndefined();
   });


   test("bad password",()=>{
      res= axios.post(`${localhost}/Login`,{
           username: "adir",
           password: "bad password"
       });
       expect(res.result).toBeUndefined();
   });


   //empty parametres
   test("empty parametres", ()=>{
       //req.session.reset();
       res =  axios.post(`${localhost}/Login`,{
           username: "",
           password: ""
       });
       expect(res.result).toBeUndefined();
       //expect(res.status).toBe(401);
   });


  


 test("Try to Register an existing user with a taken username",  () =>{
     //req.session.reset();
     await axios.post(`${localhost}/Register`,{
     username: "adir1234567",
     firstname: "adir",
     lastname:"marom",
     country: "Yemen",
     password : "marom4567",
     email: "adir@gmail.com",
     image_url : "http://google.photos.myphoto=?adir?query=1",
     type: "regular"
     }).then((res) => expect(res.status).toBe(401));
     expect(res.result).toBeUndefined();
 });

test("Try to Register an new user with non legal type field", async () =>{
    //req.session.reset();
    await axios.post(`${localhost}/Register`,{
    username: "dor",
    firstname: "dor",
    lastname:"test",
    country: "test",
    password : "test123",
    email: "adir@gmail.com",
    image_url : "http://google.photos.myphoto=?adir?query=1",
    type: "Non-legal type"
    }).then((res) => expect(res.status).toBe(400));
    //expect(res.result).toBeUndefined();
},40000);


//describe("log out test", ()=>{
//    test("Succesfull logout", async()=>{
//        res=await server.post("/Logout");
//        expect(res.message.localeCompare("logout succeeded")===0);
//    },40000)
//})
// Register Accpetence 

