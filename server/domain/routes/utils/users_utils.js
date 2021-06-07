const DButils = require("./DButils");
const users_access = require("../data/userAccess")

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

exports.markMatchAsFavorite = markMatchAsFavorite;
exports.getFavoriteMatches = getFavoriteMatches;
exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;