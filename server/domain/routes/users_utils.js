const DButils = require("./DButils");
const users_access = require("../../data/userAccess.js")

async function markPlayerAsFavorite(user_id, player_id) {
  const res=users_access.insertFavoritePlayers(user_id,player_id)
  return res;
}

async function getFavoritePlayers(user_id) {
  const player_ids =users_access.getFavoritePlayers(user_id)
  return player_ids;
}

async function markMatchAsFavorite( user_id, match_id ){
  const res=users_access.insertfavoriteMatches(user_id,match_id)
  return res;
}


async function getFavoriteMatches(user_id) {
  const match_ids =users_access.getFavoriteMatches(user_id)
  return match_ids;
}

async function isUserAdmin(userName) {
  if (!userName){return false}
  const user=users_access.getUserInfoByName(userName)
  if(user.type=='admin')
    return true;
  return false;
}

async function getUserNames() {
  const user=users_access.getUserNames()
  return user;
}


exports.getUserNames = getUserNames;
exports.isUserAdmin = isUserAdmin;
exports.markMatchAsFavorite = markMatchAsFavorite;
exports.getFavoriteMatches = getFavoriteMatches;
exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;