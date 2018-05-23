var chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;
const userStore = require('../services/userStore');

describe('userStore', () => {

    describe('getByEmail', () => {
        it('returns user on existant email', async () => {
            var user = await userStore.getByEmail('alfredorevilla@gmail.com');
            expect(user).to.not.be.null;            
        });
        it('returns null on not existant email', async () => {
            expect(await userStore.getByEmail('dsasadasdas@asdsadas.com')).to.be.null;
        });
    });

    describe('getHashedPassword', () => {
        it('returns hashed password for existant user', async () => {
            expect(await userStore.getHashedPassword({ email: 'alfredorevilla@gmail.com' })).to.not.be.null;
        });
        it('throws on not found user', async () => {
            expect(userStore.getHashedPassword({ email: 'dasdasds@gmail.com' })).to.be.rejected;
        });
    });
});