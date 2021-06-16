const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");
const matches_access = require("../../data/matchesAccess")
const uuidv4 = require("uuid/v4")

async function getGames(teamName){
    if ( !teamName ){return;}

    const matches =  matches_access.getAllMatches(teamName)
   
  // console.log(matches);
   for (let i=0 ; i<matches.length; i++){
       matches[i].date = matches[i].date.toLocaleDateString();
       matches[i].time = matches[i].time.toLocaleTimeString();
   }
   return matches;
}


async function addPastGame(gameDetails){
    if (!gameDetails){return;}
    const ID =uuidv4();
    const date = gameDetails.date;
    const time = gameDetails.time;
    const homeTeam = gameDetails.homeTeam;
    const awayTeam = gameDetails.awayTeam;
    const referee = gameDetails.referee;
    const stadium = gameDetails.stadium; 
    const scoreHome = gameDetails.scoreHome;
    const scoreAway = gameDetails.scoreAway;
    const events = gameDetails.events;
    return await matches_access.addPastGame(ID,date,time, homeTeam, awayTeam,awayTeam,referee, stadium, scoreHome, scoreAway, events);
}



async function addFutureGame(gameDetails){
    if (!gameDetails){return;}
    const ID =uuidv4();
    const date = gameDetails.date;
    const time = gameDetails.time;
    const homeTeam = gameDetails.homeTeam;
    const awayTeam = gameDetails.awayTeam;
    const referee = gameDetails.referee;
    const stadium = gameDetails.stadium; 
    return await matches_access.insertFutureGame(ID,date, time, homeTeam, awayTeam,awayTeam,referee, stadium);

}

function compareDates(d1, d2){
    
    //  d1 > d2 false
      var parts_d1 =d1.split('/');
      var d1 = Number(parts_d1[2] + parts_d1[1] + parts_d1[0]);
      parts_d2 = d2.split('/');
      var d2 = Number(parts_d2[2] + parts_d2[1] + parts_d2[0]);
      //month
      if(parts_d1[0]<0 || parts_d1[0]>12 || parts_d2[0]<0 || parts_d2[0]>12)
        return false;
      //day
      if(parts_d1[1]<0 || parts_d1[1]>31 || parts_d2[1]<0 || parts_d2[1]>31)
        return false;
      //year
      if(parts_d1[2]<0|| parts_d2[20]<0)
        return false;
      return d1 <= d2;
      }

async function getPastGames(teamName){
    if ( !teamName ){return;}
  
    result = []
    const matches =  matches_access.getAllMatches(teamName)
    
   for (let i=0 ; i<matches.length; i++){
       matches[i].date = matches[i].date.toLocaleDateString();
       matches[i].time = matches[i].time.toLocaleTimeString();

       if (compareDates(matches[i].date ,matches[i].time)) {
        result.push(matches[i]);
       }   
   }
   return result;
}

async function getMatchById(match_id){
    if ( !match_id ){return;}

    const matchArray = await matches_access.getMatchesById(match_id)
    return matchArray;
   }
   
async function updateScore(match_id, homeScore, awayScore){

    const res =  matches_access.updateMatchScore(match_id, homeScore, awayScore)
    return res;
}

async function updateEvents(match_id, events){

    const res =  matches_access.updateMatchEvents(match_id, events)
    return res;
    
}

async function getFutureGames(teamName){
    if ( !teamName ){return;}
    result = [];
 
    const matches =matches_access.getAllMatches(teamName)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
   
    for (let i=0 ; i<matches.length; i++){
        const date = matches[i].date;
        
        if (!compareDates(matches[i].date,today)) {
         result.push(matches[i]);
        }   
    }
    return result;
}



function date_to_string(date){
    if (!date ){return}
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date =  mm + '/' + dd + '/' + yyyy;
    return date

}

async function getAllFutureGames(){
  //  console.log( "in the function ")
    result = [];
    const matches =await matches_access.getAllMatches(); 
   // console.log(matches)

    var today = new Date();
    today = date_to_string(today)
 
    for (let i=0 ; i<matches.length; i++){
        let date = matches[i].date;     
        date = date_to_string( date )


        if (!compareDates(date,today)) 
            result.push(matches[i]);
           
    }
    return result;
}

exports.getAllFutureGames = getAllFutureGames;
exports.addPastGame = addPastGame;
exports.updateEvents = updateEvents; 
exports.updateScore = updateScore;
exports.addFutureGame = addFutureGame;
exports.getMatchById = getMatchById;
exports.getPastGames = getPastGames;
exports.getFutureGames = getFutureGames;
exports.getGames = getGames;

