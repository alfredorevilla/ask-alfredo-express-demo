'use strict';

const expect = require('chai').expect;
const userStore = {};
const passwordHasher = {}
const authService = new (require('../services/authService'))(userStore, passwordHasher);

describe('authService', () => {

    describe('login', () => {

        it('returns false if no user found', async () => {
            userStore.getByEmail = () => null;
            expect(await authService.login('', '')).to.be.false;
        });
        
        it('returns false on invalid password', async () => {
            userStore.getByEmail = () => { return {} };
            userStore.getHashedPassword = () => '';
            passwordHasher.verifyHashedPassword = () => false;
            expect(await authService.login('', '')).to.be.false;
        });
        
        it('returns true on valid password', async () => {
            passwordHasher.verifyHashedPassword = () => true;
            expect(await authService.login('', '')).to.be.true;
        });

    });

});