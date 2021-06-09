
//const request = require('supertest');
//var server = request.agent('http://localhost:3000');
const bcrypt = require("bcryptjs");
const axios = require('axios');
const localhost = "http://localhost:3000";
require("dotenv").config();

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


//correct Authentication

    test("Correct Authentication", () =>{
        //req.session.reset();
        const hash_password = bcrypt.hashSync("123",parseInt(process.env.bcrypt_saltRounds));
        res= axios.post(`${localhost}/Login`,{
            username: "userAdmin1",
            password: "123"
        });
        expect(res.result).toBe(401);
       //how to check promise?
    });


    test("Try to Register an existing user with a taken username",  () =>{
        //req.session.reset();
        res= axios.post(`${localhost}/Register`,{
        username: "adir1234567",
        firstname: "adir",
        lastname:"marom",
        country: "Yemen",
        password : "marom4567",
        email: "adir@gmail.com",
        image_url : "http://google.photos.myphoto=?adir?query=1",
        type: "regular"
        });
        expect(res.result).toBeUndefined();
    });


    test("Try to Register an new user with non legal type field",  () =>{
        //req.session.reset();
        res= axios.post(`${localhost}/Register`,{
        username: "adir1234567",
        firstname: "adir",
        lastname:"marom",
        country: "Yemen",
        password : "marom4567",
        email: "adir@gmail.com",
        image_url : "http://google.photos.myphoto=?adir?query=1",
        type: "Non-legal type"
        });
        expect(res.result).toBeUndefined();
    });




//describe("log out test", ()=>{
//    test("Succesfull logout", async()=>{
//        res=await server.post("/Logout");
//        expect(res.message.localeCompare("logout succeeded")===0);
//    },40000)
//})
// Register Accpetence 

