'use strict';

/*
    todo: move to integration tests folder
*/
var chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;

const userStore = require('../models/userStore')();
const fake_user = { name: "Fake", email: "fake@fakedomain.com", type: "consumer", password: 'dasdsdddsadas' };
const fake_user_email = fake_user.email;
const invalid_email = "asdsadasdsas@asdsadasdsa.com";

var userModel = null;
const addUser = async () => userModel = await userStore.add(fake_user);
const deleteUser = async () => {
    if (await userStore.getByEmail(fake_user_email))
        await userStore.db.user.where('email', fake_user_email).destroy();
}

describe('userStore', () => {

    before(async () => await deleteUser());

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

        it('throws on not found user', (done) => {
            expect(userStore.getHashedPassword({ email: invalid_email })).to.be.rejected.and.notify(done);
        });

    });

    describe('add', () => {

        it('fail on null user', (done) => {
            expect(userStore.add(null)).to.be.rejected.and.notify(done);
        });

        it('fail on null password', (done) => {
            expect(userStore.add({ password: null })).to.be.rejected.and.notify(done);
        });

        it('fail on empty password', (done) => {
            expect(userStore.add({ password: '' })).to.be.rejected.and.notify(done);
        });

        it('succeed', async () => {
            await deleteUser();
            await addUser();
        });

        //  todo: fix un uncomment
        // it('fails on registered email', (done) => {
        //     await deleteUser();
        //     await addUser();
        //     return expect(addUser()).to.be.rejected.and.notify(done);
        // });

    });

});