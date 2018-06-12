'use-strict';

const expect = require('chai').expect;
const validator = require('../services/validator').validator;

describe('validator', () => {

    describe('validate', () => {

        it('throw on null object', () => {

            expect(() => validator.validate(null, {})).to.throw;

        });

        it('throw on null schema', () => {

            expect(() => validator.validate({}, null)).to.throw;

        });

        it('succeed on empty schema', () => {

            expect(() => validator.validate({}, {})).not.to.throw;

        });

        it('success on empty validators', () => {

            expect(() => validator.validate({}, { name: [] })).not.to.throw;

        });

        it('success on valid property', () => {

            expect(() => validator.validate({}, { name: [{ validate: () => true }] })).to.not.throw();

        });

        it('fails on invalid property', () => {

            expect(() => validator.validate({}, { name: [{ validate: () => false }] })).to.throw();

        });

        it('fails with one or more invalid property', () => {

            expect(() => validator.validate({}, { name: [{ validate: () => true }, { validate: () => false }] })).to.throw();

        });

        it('succeed on custom validator succesful validation', () => {

            expect(() => validator.validate({ name: 'alfredo' }, { name: [{ validate: (value) => value === 'alfredo' }] })).to.not.throw();

        });

        it('fails on custom validator unsuccesful validation', () => {

            expect(() => validator.validate({ name: 'alfredo' }, { name: [{ validate: (value) => value === 'alfredo' }] })).to.throw();

        });

    });

});