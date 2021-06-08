const DButils = require("../domain/routes/DButils");

async function getUsersId(){
    const users_id = (await DButils.execQuery(
        "SELECT user_id FROM dbo.Users "
      )
    );

    return users_id;
}

async function getUserNames(){
    const users_names = (await DButils.execQuery(
        "SELECT username FROM dbo.users"
      )
    );

    return users_names;
}

async function getUserNames(){
    const users_names = (await DButils.execQuery(
        "SELECT username FROM dbo.users"
      )
    );

    return users_names;
}

async function registerUser(username,firstname, lastname, country, hash_password,imageUrl, email){
    await DButils.execQuery(
        `INSERT INTO dbo.users (username, firstname ,lastname ,country , password, email,image_url)
         VALUES ('${username}','${firstname}','${lastname}','${country}', '${hash_password}','${email}','${imageUrl}')`
      );
    return true;
  }

  async function registerUserReferees(username,firstname, lastname, country, hash_password,imageUrl, email){
    await DButils.execQuery(
      `INSERT INTO dbo.Referees (username, firstname ,lastname ,country , password, email,image_url)
       VALUES ('${username}','${firstname}','${lastname}','${country}', '${hash_password}','${email}','${imageUrl}')`
    );
    return true;
  }

  async function getUserInfoByName(username){
    const user = (
        await DButils.execQuery(
          `SELECT * FROM dbo.users WHERE username = '${username}'`
        )
      )[0];

    return user;
}

async function insertFavoritePlayers(user_id,player_id){
    await DButils.execQuery(
        `insert into dbo.FavoritePlayers values ('${user_id}',${player_id})`
      );
    return true;
  }

async function insertfavoriteMatches( user_id, match_id){
    await DButils.execQuery(
        `insert into dbo.FavoriteMatches
         values ('${user_id}',${match_id})`
      );
  }

async function getFavoritePlayers(user_id){
    const player_ids = await DButils.execQuery(
        `select player_id from dbo.FavoritePlayers where user_id='${user_id}'`
      );
      return player_ids;
}

async function getFavoriteMatches(user_id){
    const match_ids = await DButils.execQuery(
        `select match_id from dbo.FavoriteMatches
         where user_id='${user_id}'`
      );
      return match_ids;
}



exports.registerUserReferees = registerUserReferees;
exports.getFavoriteMatches = getFavoriteMatches;
exports.insertfavoriteMatches = insertfavoriteMatches;
exports.insertFavoritePlayers = insertFavoritePlayers;
exports.getFavoritePlayers = getFavoritePlayers;
exports.getUserNames = getUserNames;
exports.getUsersId = getUsersId;
exports.registerUser = registerUser;
exports.getUserInfoByName = getUserInfoByName;