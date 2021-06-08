const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");
const matches_access = require("../../data/matchesAccess")


async function getGames(teamName){
    if ( !teamName ){return;}

    const matches =  matches_access.getAllMatches(teamName)
   
   console.log(matches);
   for (let i=0 ; i<matches.length; i++){
       matches[i].date = matches[i].date.toLocaleDateString();
       matches[i].time = matches[i].time.toLocaleTimeString();
   }
   return matches;
}

async function addFutureGame(gameDetails){
    if (!gameDetails){return;}
    const [ID , date, time, homeTeam, awayTeam, stadium] = gameDetails;
      
    return matches_access.insertFutureGame(ID,date, time, homeTeam, awayTeam,awayTeam, stadium);
   
}

function compareDates( date,hour){
    const today = new Date();
    const dateToday = today.toLocaleDateString();
    const hourToday =  today.toLocaleTimeString();
    return dateToday > date; //past game -> true , future game -> false

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
  
    result = []
    const match =  matches_access.getMatchesById(match_id)
    return match;
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
    
    for (let i=0 ; i<matches.length; i++){
        matches[i].date = matches[i].date.toLocaleDateString();
        matches[i].time = matches[i].time.toLocaleTimeString();
        if (!compareDates(matches[i].date ,matches[i].time)) {
         result.push(matches[i]);
        }   
    }
    return result;
}

exports.updateEvents = updateEvents; 
exports.updateScore = updateScore;
exports.addFutureGame = addFutureGame;
exports.getMatchById = getMatchById;
exports.getPastGames = getPastGames;
exports.getFutureGames = getFutureGames;
exports.getGames = getGames;

