const axios = require('axios');
const localhost = "http://localhost:3000"

// **************************************** Acceptance Tests *************************************************

test('works with async/await', async () => {

    const res = await axios.get(`${localhost}/alive`);
    expect(res.data).toEqual('im alive');

  });






