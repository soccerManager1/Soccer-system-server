const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("../utils/DButils");


async function getGames(teamName){
    if ( !teamName ){return;}

    const matches = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE homeTeam = '${teamName}' OR awayTeam = '${teamName}'`
    );
    
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
    
    await DButils.execQuery(
        `INSERT INTO dbo.Matches (ID,date , time, homeTeam, awayTeam, stadium)
         VALUES ( '${ID}','${date}' , '${time}' , '${homeTeam}', '${awayTeam}', '${stadium}')`
    );
    
    return true;
   
}

function compareDates( date,hour ){
    const today = new Date();
    const dateToday = today.toLocaleDateString();
    const hourToday =  today.toLocaleTimeString();
    return dateToday > date; //past game -> true , future game -> false

}

async function getPastGames(teamName){
    if ( !teamName ){return;}
  
    result = []
    const matches = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE homeTeam = '${teamName}' OR awayTeam = '${teamName}'`
    );
    
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
    const match = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE ID = '${match_id}'`
    );
    return match
   }
   
async function updateScore(match_id, homeScore, awayScore){

    await DButils.execQuery(
        `UPDATE dbo.Matches
        SET scoreHome = '${homeScore}' , scoreAway = '${awayScore}'
        WHERE ID = '${match_id}' AND date < CURDATE(); `
    );
    
}

async function updateEvents(match_id, events){

    await DButils.execQuery(
        `UPDATE dbo.Matches
        SET events = '${events}'
        WHERE ID = '${match_id}' AND date < CURDATE(); `
    );
    
}

async function getFutureGames(teamName){
    if ( !teamName ){return;}
    result = [];
 
    const matches = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE homeTeam = '${teamName}' OR awayTeam = '${teamName}'`
    );
    
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

