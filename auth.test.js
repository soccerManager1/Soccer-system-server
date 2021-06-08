const app = require('../main')
var server = request.agent('http://localhost:3000');
require("dotenv").config();

//bad Authentication
describe("bad Authentication",() =>{


    test("Bad userName", async ()=>{
        res= await server.post("/Login").send({
            username: "No one",
            password: "pass123"
        });
        expect(res.statusCode).toBe(401);
    },3000)


    test("bad password", async()=>{
        res= await server.post("/Login").send({
            username: "Adir",
            password: "badpassword"
        });
        expect(res.statusCode).toBe(401);
    })


    //empty parametres
    test("empty parametres", async()=>{
        res= await server.post("/Login").send({
            username: "",
            password: ""
        });
        expect(res.statusCode).toBe(401);
    })
})

//correct Authentication
describe("Correct Authentication",() =>{

    test("Correct Authentication", async () =>{
        res= await server.post("/Login").send({
            username: "Adir",
            password: "Marom123"
        });
        expect(res.statusCode).toBe(200);
    },3000)
})


describe("log out test", ()=>{
    test("Succesfull logout", async()=>{
        res=await server.post("/Logout");
        expect(res.message.localeCompare("logout succeeded")===true);
    },3000)
})


// Register Accpetence 

describe("Good Register",() =>{

    test("Correct Register", async () =>{
        res= await server.post("/Register").send({
            username: "Adir12",
            firstname: "adir",
            lastname : "marom",
            country : "Israel",
            password: "Marom123",
            email: "adir@gmail.com",
            imageUrl: "http://google.photos.myphoto=?adir?query=1"
        });
        expect(res.statusCode).toBe(200);
    },3000)

})

