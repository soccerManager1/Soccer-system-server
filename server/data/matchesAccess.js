const DButils = require("../domain/routes/DButils");

async function getAllMatchesByTeam(teamName){
    const matches = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE homeTeam = '${teamName}' OR awayTeam = '${teamName}'`
    );
    return matches;
}

async function getAllMatches(){
    const matches = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches`
    );
    return matches;
}

async function getMatchesById(ID){
    const match = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE ID = '${ID}'`
    );
    return match
}


async function getFavoriteMatches(username){
    const matchArray = await DButils.execQuery(
        `SELECT *
         FROM dbo.MatchesUsers
         WHERE ID = '${username}'`
    );
    return matchArray;
}


async function insertFutureGame(ID,date, time, homeTeam, awayTeam, referee, stadium){

    await DButils.execQuery(
        `INSERT INTO dbo.Matches (ID,date , time, homeTeam, awayTeam, referee , stadium)
         VALUES ( '${ID}','${date}' , '${time}' , '${homeTeam}', '${awayTeam}','${referee}', '${stadium}')`
    );
    
    return true;
  }

  async function updateMatchScore(match_id, homeScore, awayScore){
    await DButils.execQuery(
        `UPDATE dbo.Matches
        SET scoreHome = '${homeScore}' , scoreAway = '${awayScore}'
        WHERE ID = '${match_id}' AND date < CURDATE(); `
    );

    return true;
}

async function updateMatchEvents(match_id, events){
    await DButils.execQuery(
        `UPDATE dbo.Matches
        SET events = '${events}'
        WHERE ID = '${match_id}' AND date < CURDATE(); `
    );

    return true;
}

exports.getFavoriteMatches = getFavoriteMatches;
exports.getAllMatches = getAllMatches;
exports.getAllMatchesByTeam = getAllMatchesByTeam;
exports.insertFutureGame = insertFutureGame;
exports.getMatchesById = getMatchesById;
exports.updateMatchEvents = updateMatchEvents;
exports.updateMatchScore = updateMatchScore;


