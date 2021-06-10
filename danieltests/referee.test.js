
const axios = require('axios');
const localhost = "http://localhost:3000";
require("dotenv").config();
jest.setTimeout(30000);

// good permission- admin user
test("try to register new referee with Union Rep permissions", async ()=>{

    await axios.post(`${localhost}/Login`,{ //Login as admin user
        username:'adminUser1',
        password:'123456'
    });

    //try to register the referee
    res = await axios.post(`${localhost}/Register`,{

        username:'Ref14',
        firstname:'adirr12223',
        lastname:'maroma12223',
        country:'Yemen',
        password:'marom4567',
        email:'ad2i22312312r@gmail.com',
        imageUrl:'http://google.photos.myphoto=?adir?query=1',
        type:'referee'
    });
    expect(res.statusCode).toBe(200);

});

test("try to register referee username already taken with Union Rep permissions", async ()=>{

    await axios.post(`${localhost}/Login`,{ //Login as admin user
        username:'adminUser1',
        password:'123456'
    });
    //expect(res.status).toBe(201);

    res = await axios.post(`${localhost}/Register`,{

        username:'Ref14',
        firstname:'adirr12223',
        lastname:'maroma12223',
        country:'Yemen',
        password:'marom4567',
        email:'ad2i22312312r@gmail.com',
        imageUrl:'http://google.photos.myphoto=?adir?query=1',
        type:'referee'
    });
    expect(res.statusCode).toBe(400);


});

test("try to register referee missing parameters with Union Rep permissions", async ()=>{

    await axios.post(`${localhost}/Login`,{ //Login as admin user
        username:'adminUser1',
        password:'123456'
    });
    //expect(res.status).toBe(201);

    res = await axios.post(`${localhost}/Register`,{

        username:'Ref14',
        firstname:'adirr12223',
        lastname:'maroma12223',
        country:'Yemen',
        password:'marom4567',
        email:'ad2i22312312r@gmail.com',
        imageUrl:'http://google.photos.myphoto=?adir?query=1',
        type:''
    });
    expect(res.statusCode).toBe(400);


});


// bad permission - regualr user
test("try to register referee without Union Rep permissions", async ()=>{
    axios.post(`${localhost}/Logout`,{});

    res = await axios.post(`${localhost}/Login`,{ //Login as regular user
        username:'regUser1',
        password:'123456'
    });
    //expect(res.status).toBe(401);

    res = await axios.post(`${localhost}/Register`,{

        username:'Ref14',
        firstname:'adirr12223',
        lastname:'maroma12223',
        country:'Yemen',
        password:'marom4567',
        email:'ad2i22312312r@gmail.com',
        imageUrl:'http://google.photos.myphoto=?adir?query=1',
        type:'referee'
    });
    expect(res.statusCode).toBe(401);
});