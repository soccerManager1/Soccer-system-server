const axios = require('axios');
const localhost = "http://localhost:3000"

test('works with async/await', async () => {

    const res = await axios.get(`${localhost}/alive`);
    expect(res.data).toEqual('im alive');

  });

test('test the coach object that return from server', async () => {

    const res =await axios.get(`${localhost}/coaches/getCoach/1467946`);
    expect(res.data.common_name).toEqual('N. Lennon');

});

test('test the user object that return from Login POST server requset ', async () => {

    const res =await axios.post(`${localhost}/Login`,{
        username:'aa11',
        password:'123'
    });

    expect(res.status).toBe(200);

  });



test('test the coach object that return from server', async () => {

    const res =await axios.get(`${localhost}/teamFullDetails/939`);

    expect(res.status).toBe(200);

  });







