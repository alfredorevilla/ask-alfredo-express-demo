const expect = require('chai').expect;
const userStore = {};
const passwordValidator = {}
const authService = new (require('../services/authService'))(userStore, passwordValidator);

describe('AuthService.login', () => {
    it('returns false if no user found', async () => {
        userStore.getByEmail = () => null;
        expect(await authService.login('', '')).to.be.false;
    });
    it('returns false on invalid password', async () => {
        userStore.getByEmail = () => { return { } };
        userStore.getHashedPassword = () => '';
        passwordValidator.verifyHashedPassword = () => false;
        expect(await authService.login('', '')).to.be.false;
    });
    it('returns true on valid password', async () => {
        passwordValidator.verifyHashedPassword = () => true;
        expect(await authService.login('', '')).to.be.true;
    });
});