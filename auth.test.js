
const request = require('supertest');
var server = request.agent('http://localhost:3000');
require("dotenv").config();

//non existing user or passwords
describe("bad Authentication",() =>{

    test("Bad userName", async ()=>{
        res= await server.post("/Login").send({
            username: "No one",
            password: "pass123"
        });
        expect(res.statusCode).toBe(401);
    },40000);


    test("bad password", async()=>{
        res= await server.post("/Login").send({
            username: "adir",
            password: "marom"
        });
        expect(res.statusCode).toBe(401);
    },40000);


    //empty parametres
    test("empty parametres", async()=>{
        res= await server.post("/Login").send({
            username: "",
            password: ""
        });
        expect(res.statusCode).toBe(401);
    },40000);
});

//correct Authentication
describe("Correct Authentication",() =>{

    test("Correct Authentication", async () =>{
        res= await server.post("/Login").send({
            username: "adir",
            password: "marom456"
        });
        expect(res.statusCode).toBe(200);
    },40000);
});


//describe("log out test", ()=>{
//    test("Succesfull logout", async()=>{
//        res=await server.post("/Logout");
//        expect(res.message.localeCompare("logout succeeded")===0);
//    },40000)
//})


// Register Accpetence 

describe("Good Register",() =>{

    test("Correct Register", async () =>{
        res= await server.post("/Register").send({
        username: "adir",
        firstname: "adir",
        lastname:"marom",
        country: "Yemen",
        password : "marom4567",
        email: "adir@gmail.com",
        imageUrl : "http://google.photos.myphoto=?adir?query=1"
        });
        expect(res.statusCode).toBe(200);
    },40000);

});

