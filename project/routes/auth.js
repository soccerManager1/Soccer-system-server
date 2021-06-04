var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcryptjs");
require("dotenv").config();

//router.use("/registerReferee",async function (req, res, next) {
//  if (req.session && req.session.user_id) {
//    DButils.execQuery("SELECT user_id FROM dbo.Users ")
//      .then((users) => {
//        if (users.find((x) => x.user_id === req.session.user_id)) {
//          req.user_id = req.session.user_id;
//          next();
//        }
//      })
//      .catch((err) => next(err));
//  } else {
//    res.sendStatus(401);
//  }
//});


// this function for prepertion workshop project
router.post("/registerReferee", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists

    const { username, firstname , lastname, country, password, email, imageUrl  } = req.body;
    if (!username || !firstname || !lastname || !country || !password || !email || !imageUrl){
      throw {
        status: 400,
        massege: "all parameters are requird!"
      }
    }

    const users = await DButils.execQuery(
      "SELECT username FROM dbo.Referees"
    );
    
    if (users.find((x) => x.username === username))
      throw { status: 409, message: "Username taken" };

    //hash the password
    let hash_password = bcrypt.hashSync(
      password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    req.body.password = hash_password;

    // add the new username
    await DButils.execQuery(
      `INSERT INTO dbo.Referees (username, firstname ,lastname ,country , password, email,image_url)
       VALUES ('${username}','${firstname}','${lastname}','${country}', '${hash_password}','${email}','${imageUrl}')`
    );
    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});



router.post("/Register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists

    const { username, firstname , lastname, country, password, email, imageUrl  } = req.body;
    if (!username || !firstname || !lastname || !country || !password || !email || !imageUrl){
      throw {
        status: 400,
        massege: "all parameters are requird!"
      }
    }

    const users = await DButils.execQuery(
      "SELECT username FROM dbo.users"
    );
    
    if (users.find((x) => x.username === username))
      throw { status: 409, message: "Username taken" };

    //hash the password
    let hash_password = bcrypt.hashSync(
      password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    req.body.password = hash_password;

    // add the new username
    await DButils.execQuery(
      `INSERT INTO dbo.users (username, firstname ,lastname ,country , password, email,image_url)
       VALUES ('${username}','${firstname}','${lastname}','${country}', '${hash_password}','${email}','${imageUrl}')`
    );
    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    const user = (
      await DButils.execQuery(
        `SELECT * FROM dbo.users WHERE username = '${req.body.username}'`
      )
    )[0];
    // user = user[0];
    console.log(user);

    // check that username exists & the password is correct
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.user_id;

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
