const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";


async function getCoachbyId( coachId ){
  const coach =  await axios.get(`${api_domain}/coaches/${coachId}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  return extractCoachData(coach.data.data);
}

async function getCoachbyTeamId(team_id) {
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "coach",
      api_token: process.env.api_token,
    },
  });

  const coach = team.data.data.coach.data;
  return {
    name: coach.fullname,
    image: coach.image_path,
    team_name: team.data.data.name,
    nationality: coach.nationality,
  };
}


function extractCoachData(coachs_info) {
  if (!coachs_info){return;}
  return {
    common_name: coachs_info.common_name,
    nationality: coachs_info.nationality,
    birthdate: coachs_info.birthdate,
    birthplace: coachs_info.birthplace,
  };

}


exports.getCoachbyTeamId = getCoachbyTeamId;
exports.getCoachbyId = getCoachbyId;
exports.extractCoachData = extractCoachData;
