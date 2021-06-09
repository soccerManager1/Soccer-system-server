const DButils = require("../domain/routes/DButils");

async function getAllMatches(teamName){
    const matches = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE homeTeam = '${teamName}' OR awayTeam = '${teamName}'`
    );

    return matches;
}

async function getMatchesById(match_id){
    const match = await DButils.execQuery(
        `SELECT *
         FROM dbo.Matches
         WHERE ID = '${match_id}'`
    );
    return match
}


async function insertFutureGame(ID,date, time, homeTeam,awayTeam,referee,stadium,scoreHome,scoreAway,events){
    await DButils.execQuery(
        `INSERT INTO dbo.Matches (ID,date, time, homeTeam,awayTeam,referee,stadium,scoreHome,scoreAway,events)
         VALUES ( '${ID}','${date}' , '${time}' , '${homeTeam}', '${awayTeam}','${referee}', '${stadium}', '${scoreHome}','${scoreAway}','${events}')`
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

exports.getAllMatches = getAllMatches;
exports.insertFutureGame = insertFutureGame;
exports.getMatchesById = getMatchesById;
exports.updateMatchEvents = updateMatchEvents;
exports.updateMatchScore = updateMatchScore;


