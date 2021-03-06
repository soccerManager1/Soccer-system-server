
const axios = require("axios");
const { Console } = require('console')
const  api  = require('../api')

console.log("welcome to soccer system")
console.log("please choose one of the use case:")
console.log("number 1: Reffere Registering")
console.log("number 2: Match setting")
console.log("number 3:Login procedure")
console.log("for exist type 0")


var readline = require('readline'),
rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('type use case number>');
rl.prompt();

let d_username="ref";
let d_firstname="ref";;
let d_lastname="ref";;
let d_country="ref";;
let d_password="ref";;
let d_email="ref";;
let d_imageUrl="ref";;
let d_type="referee";

rl.on('line',async function(line) {
  switch(line.trim()) {

      case '1':
        console.log('UC : Reffere Registering');
        rl.question("type 'T' for default value: ",async function(answer){
          if(answer=="T"){         
            try{
              const res1 =await axios.post(`http://localhost:3000/Login`,{
                username:'adminUser1',
                password:'123456',
            })
              const res2 =await axios.post(`http://localhost:3000/Register`,{
                username: d_username,
                firstname: d_firstname,
                lastname: d_lastname,
                country: d_country,
                password: d_password,
                email: d_email,
                imageUrl: d_imageUrl,
                type: d_type
          })
          }
          catch (error) {
            console.log(error);
           }
          }
        })
          break;
      case '2':

      case '3':
        console.log('UC : Login procedure');
        rl.question("type 'T' for default value: ",async function(answer){
          if(answer=="T"){
            try{
             const x=await api.login('adminUser1','123456');
             console.log('Login succeeded');
          }
          catch (error) {
            console.log("error");
           }
          }
        })

          break;


      case '0':
          console.log('Have a great day!');
          process.exit(0);


      default:
          console.log('Say what? I might have heard `' + line.trim() + '`');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});
