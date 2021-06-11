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

    //res is a promise?
    try {
        await axios.post(`${localhost}/Login`,{
            username:"Noone",
            password:"pass123"
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
      }

   });


test("bad password", async() =>{
    try {
        await axios.post(`${localhost}/Login`,{
            username:"adir",
            password:"bad password"
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
      }

   });


   //empty parametres
   test("empty parametres", async() =>{
       try {
        await axios.post(`${localhost}/Login`,{
            username:"",
            password:""
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
      }
   });


 test("Try to Register an existing user with a taken username", async() =>{

     try {
        await axios.post(`${localhost}/Register`,{
            username:"adir1234567",
            firstname:"adir",
            lastname:"marom",
            country:"Yemen",
            password:"marom4567",
            email:"adir@gmail.com",
            imageUrl:"http://google.photos.myphoto=?adir?query=1",
            type:"regular"
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 409'));
      }
 });

test("Try to Register an new user with non legal type field", async () =>{
    try {
        await axios.post(`${localhost}/Register`,{
            username:"dor",
            firstname:"dor",
            lastname:"test",
            country:"test",
            password:"test123",
            email:"adir@gmail.com",
            imageUrl:"http://google.photos.myphoto=?adir?query=1",
            type:"Non-legal type"
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 400'));
      }
});


//describe("log out test", ()=>{
//    test("Succesfull logout", async()=>{
//        res=await server.post("/Logout");
//        expect(res.message.localeCompare("logout succeeded")===0);
//    },40000)
//})
// Register Accpetence 

