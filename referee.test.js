
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

    try {
        await axios.post(`${localhost}/Register`,{
            username:'Ref14',
            firstname:'adirr12223',
            lastname:'maroma12223',
            country:'Yemen',
            password:'marom4567',
            email:'ad2i22312312r@gmail.com',
            imageUrl:'http://google.photos.myphoto=?adir?query=1',
            type:'referee'
        });
      } catch (e) {
        //should be 200
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
      }
});

test("try to register referee with username already taken ", async ()=>{

    await axios.post(`${localhost}/Login`,{ //Login as admin user
        username:'adminUser1',
        password:'123456'
    });
    //expect(res.status).toBe(201);

    try {
        await axios.post(`${localhost}/Register`,{
            username:'Ref18',
            firstname:'adirr12223',
            lastname:'maroma12223',
            country:'Yemen',
            password:'marom4567',
            email:'ad2i22312312r@gmail.com',
            imageUrl:'http://google.photos.myphoto=?adir?query=1',
            type:'referee'
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 409'));
      }

});

test("try to register referee missing parameters", async ()=>{

    await axios.post(`${localhost}/Login`,{ //Login as admin user
        username:'adminUser1',
        password:'123456'
    });
    //expect(res.status).toBe(201);
    try {
        await axios.post(`${localhost}/Register`,{
            username:'Ref14',
            firstname:'adirr12223',
            lastname:'maroma12223',
            country:'Yemen',
            password:'marom4567',
            email:'ad2i22312312r@gmail.com',
            imageUrl:'http://google.photos.myphoto=?adir?query=1',
            type:''
        });
      } catch (e) {
        expect(e).toStrictEqual(Error('Request failed with status code 400'));
      }
});


// bad permission - regualr user
test("try to register referee without Union Rep permissions", async ()=>{

    try {
        await axios.post(`${localhost}/Login`,{ //Login as regular user
            username:'regUser1',
            password:'123456'
        });
        
        await axios.post(`${localhost}/Register`,{
            username:'Ref14',
            firstname:'adirr12223',
            lastname:'maroma12223',
            country:'Yemen',
            password:'marom4567',
            email:'ad2i22312312r@gmail.com',
            imageUrl:'http://google.photos.myphoto=?adir?query=1',
            type:'referee'
        });
      } catch (e) {
        //should be 403
        expect(e).toStrictEqual(Error('Request failed with status code 401'));
      }
});



// try to register referee with no user looged in 
test("try to register referee without Union Rep permissions", async ()=>{

  try {
      
      await axios.post(`${localhost}/Register`,{
          username:'Ref14',
          firstname:'adirr12223',
          lastname:'maroma12223',
          country:'Yemen',
          password:'marom4567',
          email:'ad2i22312312r@gmail.com',
          imageUrl:'http://google.photos.myphoto=?adir?query=1',
          type:'referee'
      });
    } catch (e) {
      expect(e).toStrictEqual(Error('Request failed with status code 401'));
    }
});



