const expect = require('chai').expect;
const userStore = {};
const passwordValidator = {}
const authService = new (require('../services/authService'))(userStore, passwordValidator);

describe('AuthService.login', () => {
    it('returns false if no user found', async () => {
        userStore.getByEmail = () => null;
        expect(await authService.login('', '')).to.be.false;
    });
    it('returns passwordValidator.tryValidate result', async () => {
        userStore.getByEmail = () => { };
        passwordValidator.tryValidate = () => false;
        expect(await authService.login('', '')).to.be.false;
    });
});