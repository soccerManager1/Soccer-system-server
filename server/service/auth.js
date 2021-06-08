var express = require("express");
var router = express.Router();
const DButils = require("../domain/routes/DButils");
const bcrypt = require("bcryptjs");
const users_access = require("../data/userAccess")
const users_utils = require("../domain/routes/users_utils")
require("dotenv").config();




//middleware
router.use("/Register", async function (req, res, next) {


 console.log("in the middleware")

  // parameters exists
  // valid parameters
  console.log(req.body);
  const type=req.body.type; 
  const username=req.body.username;
  const firstname=req.body.firstname;
  const lastname=req.body.lastname;
  const country=req.body.country;
  const password=req.body.password;
  const email=req.body.email;
  const imageUrl=req.body.imageUrl;
  try{


 if (!username || !firstname || !lastname || !country || !password || !email || !imageUrl || !type){
   throw {
     status: 400,
     massege: "all parameters are requird!"
   }
 }
  // valide type
  console.log(type)
 if( type!="regular" && type!="referee"){
  throw {
    status: 400,
    massege: "invalid user type "
  }
 }

 console.log(type)
const all_users = await users_access.getUserNames();
console.log(all_users);

  if ( all_users.find((x) => x.username === username))
    throw { status: 409, message: "Username taken" };
}

catch (error) {
 next(error);
}
try{
 if(type=="referee"){
   //admin user loggin

      if(!req.session || !req.session.user_id)
        throw { status: 401, message: "please login before trying the following request" };

      if( users_utils.isUserAdmin(req.session.user_id) == false)
        throw { status: 403, message: "no premission to do the following requste" };
   }
  }
   catch (error) {
    next(error);
  }
 next();
});

router.post("/Register", async (req, res, next) => {
  try {
    console.log("in the function")


    const { username, firstname , lastname, country, password, email, imageUrl,type  } = req.body;

    //hash the password
    let hash_password = bcrypt.hashSync(password,parseInt(process.env.bcrypt_saltRounds));
    req.body.password = hash_password;
    
    // add the new username
    const result = await users_access.registerUser(username,firstname, lastname, country, hash_password,imageUrl, email,type)
    
    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await users_access.getUserInfoByName(req.body.username);
    console.log(user)

    // check that username exists & the password is correct
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.username;

    // return cookie
    res.status(200).send("login succeeded");
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
