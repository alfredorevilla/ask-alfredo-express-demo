'use-strict';
const expect = require('chai').expect;
const weakPasswordHasher = require('../services/weakPasswordHasher');

describe('weakPasswordHasher', () => {

    describe('validate', () => {

        it('hashed password must not be equal to clear password', () => {

            expect(weakPasswordHasher.hashPassword('askjack')).to.not.be.eq('askjack');

        });

        it('verifyHashedPassword succeeds using hashed password', () => {

            const hashedPassword = weakPasswordHasher.hashPassword('askjack');

            expect(weakPasswordHasher.verifyHashedPassword(hashedPassword, 'askjack')).to.be.true;

        });

        it('verifyHashedPassword fails using any hashed password', () => {

            const hashedPassword = weakPasswordHasher.hashPassword('askjack');
            
            expect(weakPasswordHasher.verifyHashedPassword('anyotherhash', 'askjack')).to.be.false;

        });

        it('verifyHashedPassword fails using clear  password', () => {

            const hashedPassword = weakPasswordHasher.hashPassword('askjack');
            
            expect(weakPasswordHasher.verifyHashedPassword('askjack', 'askjack')).to.be.false;

        });

    });

});