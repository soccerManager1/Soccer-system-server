const userAccessUtil = require("../server/data/userAccess.js");
//var server = request.agent('http://localhost:3000');


//Assuming user name with the following details is in the DB
test("bad fetch of non existing user",async () =>{
    const bad_user = await userAccessUtil.getUserInfoByName("non_exsiting");
    expect (bad_user).toBeUndefined() ;
},40000);


test("good fetch of user that is in the DB",async () =>{
    const temp_user = await userAccessUtil.getUserInfoByName("Dor");
    const test_user = {
        username:"Dor",
        firstname:"dor",
        lastname:"levi",
        country:"israel",
        password:"$2a$10$o7Cm0ZgLmgxYdhLGloxMFOjcoWivSqzeYpjQTEWQMyP/qi/jxjLXK",
        email:"www.www",
        image_url:"www.www",
        type:"regular"
    };

    expect(temp_user).toEqual(test_user);
},40000);


//Assuming user name with the following details is in the DB
test("existing user",async () =>{
    const users = await userAccessUtil.getUserNames("adir");
    expect (users.length).not.toBe(0) ;
},40000);

test("existing user info",async () =>{
    const users = await userAccessUtil.getUserInfoByName("adir");
    expect (users.length).not.toBe(0) ;
},40000);

test("not existing user info",async () =>{
    const users = await userAccessUtil.getUserInfoByName("non_exsiting");
    expect (users).toBeUndefined();
},40000);

test("get user info",async () =>{
    const users = await userAccessUtil.getUserNames();
    expect (users.length).not.toBe(0) ;
},40000);


