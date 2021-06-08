const userAccessUtil = require("../server/data/userAccess");
var server = request.agent('http://localhost:3000');


//Assuming user name with the following details is in the DB
//username: adir , firstname: adir ,lastname: marom ,pass: marom456 ..

test("bad fetch of non existing user",async () =>{
    const bad_user=await userAccessUtil.getUserFromDb("non_exsiting");
    expect (bad_user).toBeNull();
});



test("good fetch of user that is in the DB",async () =>{
    const temp_user= await userAccessUtil.getUserFromDb("adir");
    const test_user = {
        username: "adir",
        firstname: "adir",
        lastname:"marom",
        country: "Yemen",
        password : "marom456",
        email: "adir@gmail.com",
        imageUrl : "http://google.photos.myphoto=?adir?query=1"
    };

    expect(temp_user).toEqual(test_user);
});

