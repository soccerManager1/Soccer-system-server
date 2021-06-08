
const axios = require("axios");


function register(user){
    console.log(user);
	const res = axios.post(`http://localhost:3000/Register`,{
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        country: user.country,
        password: user.password,
        email: user.email,
        imageUrl: user.image_url,
        type: user.type
    })

    return res;
}

exports.register=register;
