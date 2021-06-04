const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// const TEAM_ID = "85";

function sortPlayersByName(players){
  return players.slice().sort( function ( player1,player2 ){
    return player2.name - player1.name;
  });
}

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  console.log(players_info);
  return await extractRelevantPlayerData(players_info);
}

 function extractRelevantPlayerData(players_info) {
  return players_info.map((player_info) => {
    console.log(player_info.data.data);
    const { fullname, image_path, position_id } = player_info.data.data;
    
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
    };
  });
}

async function getPlayersByTeam(team_id) {

  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}

async function getPlayerbyName(playerName){
  let playerList=[];
  const res = await axios.get(`${api_domain}/players/search/${playerName}`, {
    params: {
      api_token: process.env.api_token,
    },
  });

  res.data.data.map((player) => playerList.push(player));
  let players_info = await Promise.all(playerList);
  return extractPlayerData(players_info);
}
  
function extractPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { common_name, nationality,birthdate,birthplace,height,weight } = player_info;

    return {
      commonname: common_name,
      nationality: nationality,
      birthdate: birthdate,
      birthplace: birthplace,
      height: height,
      weight: weight
    };
  });
}


exports.sortPlayersByName = sortPlayersByName; 
exports.getPlayerbyName = getPlayerbyName;
exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;

