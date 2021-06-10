const userAccessUtil = require("../server/data/userAccess");
//var server = request.agent('http://localhost:3000');


//Assuming user name with the following details is in the DB
test("bad fetch of non existing user",async () =>{
    const bad_user=await userAccessUtil.getUserInfoByName("non_exsiting");
    expect (bad_user).toBeUndefined() ;
},40000);


test("good fetch of user that is in the DB",async () =>{
    const temp_user= await userAccessUtil.getUserInfoByName("adir");
    const test_user = {
        username: "adir",
        firstname: "adir",
        lastname:"marom",
        country: "Yemen",
        password : "marom456",
        email: "adir@gmail.com",
        image_url :"http://google.photos.myphoto=?adir?query=1",
        type: "regular"
    };

    expect(temp_user).toEqual(test_user);
},40000);

// what other test? maybe login and then login again 

