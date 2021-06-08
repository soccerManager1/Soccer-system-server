const users_utils = require("../server/domain/routes/users_utils")

//function tests

test('good login', async () => {
    let userName = "adir";
    let password = "marom456";
    const res = await users_utils.Login(userName, password);
    expect(res).toBe(0); //succseful login
});


test('bad login', async () => {
    let userName = "adir";
    let password = "notpassword";
    const res = await users_utils.LoginCheck(userName, password);
    expect(res).toBe(-1); //succseful login
});

