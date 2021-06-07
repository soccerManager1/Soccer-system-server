import axios from 'axios';
import { time } from 'console';

export type User = {
	username: string;
    firstname: string;
    lastname: string;
    country: string;
    password: string;
    email: string;
    image_url: string;
    isReferee: boolean
}

export type League = {
	league_name: string;
    current_season_name: string;
    current_stage_name: string;
}

export type PlayerPreview = {
	name: string;
	image: string;
    position: string;
    team_name: string;
}

export type Team = {
	name: string;
    players: [];

}

export type LoginScheme = {
	username: string ;
	password: string,
}

export type Coach = {
    name: string,
    image: string,
    team_name: string,
    nationality: string,
}

export type Player = {
    name: string,
    nationality: string,
    birthdate: string,
    birthplace: string,
    height: number,
    weight:number,
}




export type ApiClient = {

    register: (user: User, isReferee: boolean) => Promise<String>;

    logout: () => Promise<String>;

    login: (username: string , password: string) => Promise<string>;
	
	teamFullDetails: (teamId: number) => Promise<Team>;
		
	getCoachByTeamId: (teamId: number) => Promise<Coach>;

	getPlayerByName: (playerName: string) => Promise<Player>;

    getCoach: (coachId: string) => Promise<Coach>;
	
    allSeasonGames: (team_name:string)=>  Promise<[]>;

	pastSeasonGames: (team_name:string)=>  Promise<[]>;

    futureSeasonGames: (team_name:string)=>  Promise<[]>;
  
    createNewGame:  ()=>  Promise<string>;
   
    updateScore:  ()=>  Promise<string>;

    updateEvents: ()=> Promise<string>;

}

export const createApiClient = (): ApiClient => {
	return {
        logout: () => {
			return axios.post(`http://localhost:3000/Logout`).then((res) => res.data);
		},

        register: (user: User,  isReferee: boolean) => {
			return axios.post(`http://localhost:3000/Register?isReferee=${isReferee}`,{
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                country: user.country,
                password: user.password,
                email: user.email,
                imageUrl: user.image_url,

            }).then((res) => res.data);
		},
        login: (username: string , password: string) => {
			return axios.post(`http://localhost:3000/Login`,{
                username: username,
                password: password,
            }).then((res) => res.data);
		},

		teamFullDetails: (teamId: number) => {
			return axios.post(`http://localhost:3000/teams/teamFullDetails/${teamId}`,{sorted: String, filter: String}).then((res) => res.data);
		},
		getCoachByTeamId: (teamId: number) => {
			return axios.get(`http://localhost:3000/teams/getCoachByTeamId/${teamId}`).then((res) => res.data);
		},
		getPlayerByName: (playerName: string) => {
			return axios.get(`http://localhost:3000/players/playersDetails/${playerName}`).then((res) => res.data);
		},
        getCoach: (coachId: string) => {
			return axios.get(`http://localhost:3000/coaches/getCoach/${coachId}`).then((res) => res.data);
		},
		allSeasonGames: (team_name:string) => {
			return axios.get(`http://localhost:3000/allSeasonGames/matches/${team_name}`).then((res) => res.data);
		},		
        pastSeasonGames: (team_name:string) => {
			return axios.get(`http://localhost:3000/pastSeasonGames/matches/${team_name}`).then((res) => res.data);
		},
        futureSeasonGames: (team_name:string) => {
			return axios.get(`http://localhost:3000/futureSeasonGames/matches/${team_name}`).then((res) => res.data);
		},
        createNewGame: () => {
			return axios.post(`http://localhost:3000/matches/newGame`,{
                ID: String,
                date: Date,
                time: time,
                homeTeam: String,
                awayTeam: String,
                stadium: String,
            }).then((res) => res.data);
		},

        updateScore: () => {
			return axios.put(`http://localhost:3000/matches/updateScore`,{
                match_id: String,
                homeScore: Number,
                awayScore: Number,
            }).then((res) => res.data);
		},

        updateEvents: () => {
			return axios.put(`http://localhost:3000/matches/updateScore`,{
                match_id: String,
                events: String,
            }).then((res) => res.data);
		},

	}
};