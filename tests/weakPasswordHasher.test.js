'use-strict';

const expect = require('chai').expect;
const weakPasswordHasher = require('../services/weakPasswordHasher');

describe('weakPasswordHasher', () => {

    describe('validate', () => {

        it('hashed password must not be equal to clear password', () => {

            expect(weakPasswordHasher.hashPassword('askalfredo')).to.not.be.eq('askalfredo');

        });

        it('verifyHashedPassword succeeds using hashed password', () => {

            const hashedPassword = weakPasswordHasher.hashPassword('askalfredo');

            expect(weakPasswordHasher.verifyHashedPassword(hashedPassword, 'askalfredo')).to.be.true;

        });

        it('verifyHashedPassword fails using any hashed password', () => {

            const hashedPassword = weakPasswordHasher.hashPassword('askalfredo');
            
            expect(weakPasswordHasher.verifyHashedPassword('anyotherhash', 'askalfredo')).to.be.false;

        });

        it('verifyHashedPassword fails using clear  password', () => {

            const hashedPassword = weakPasswordHasher.hashPassword('askalfredo');
            
            expect(weakPasswordHasher.verifyHashedPassword('askalfredo', 'askalfredo')).to.be.false;

        });

    });

});