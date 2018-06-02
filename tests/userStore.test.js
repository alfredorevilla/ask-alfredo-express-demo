/*
    todo: move to integration tests folder
*/

var chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;

const passwordHasher = {};
const userStore = require('../models/userStore')(passwordHasher);

const fake_user = { name: "Fake", email: "fake@fakedomain.com", role: "consumer" };
const fake_user_email = fake_user.email;
const invalid_email = "asdsadasdsas@asdsadasdsa.com";

var userModel = null;
const addUser = async () => userModel = await userStore.add(fake_user, 'asdsadsaddas');
const deleteUser = async () => {
    if (await userStore.getByEmail(fake_user_email))
        await userStore.db.user.where('email', fake_user_email).destroy();
}

describe('userStore', () => {

    before(async () => await deleteUser());
    before(() => passwordHasher.hashPassword = (password) => password);

    describe('getByEmail', () => {

        before(async () => await addUser());
        it('returns user on existant email', async () => {
            var stored = await userStore.getByEmail(fake_user_email);
            expect(stored).to.not.be.null;
        });

        it('returns null on not existant email', async () => {
            expect(await userStore.getByEmail(invalid_email)).to.be.null;
        });

    });

    describe('getHashedPassword', () => {

        it('returns hashed password for existant user', async () => {
            expect(await userStore.getHashedPassword({ email: fake_user_email })).to.not.be.null;
        });

        it('throws on not found user', async () => {
            expect(userStore.getHashedPassword({ email: invalid_email })).to.be.rejected;
        });

    });

    describe('add', () => {

        it('fail on null user', () => {
            expect(userStore.add(null, 'sasasa')).to.be.rejected;
        });

        it('fail on null password', () => {
            expect(userStore.add({}, null)).to.be.rejected;
        });

        it('fail on empty password', () => {
            expect(userStore.add({}, '')).to.be.rejected;
        });

        it('succeed', async () => {
            await deleteUser();
            await addUser();
        });

        it('fails on registered email', async () => {
            await deleteUser();
            await addUser();
            return expect(addUser()).to.be.rejected;
        });

    });

});