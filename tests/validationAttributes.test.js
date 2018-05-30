'use-strict';
const expect = require('chai').expect;
const { email, required, validator } = require('../services/validator');

describe('validationAttributes', () => {

    describe('required', () => {

        it('valid', () => {

            expect(required().validate('s')).to.be.true;

        });

        it('invalid on empty', () => {

            expect(required().validate('')).to.be.false;

        });


        it('invalid on null', () => {

            expect(required().validate(null)).to.be.false;

        });

        it('invalid on undefined', () => {

            expect(required().validate(undefined)).to.be.false;

        });

    });

    describe('email', () => {

        it('valid', () => {

            expect(email().validate('a@a.aa')).to.be.true;

        });

        it('valid', () => {

            expect(email().validate('a@a.a.aa')).to.be.true;

        });

        it('valid', () => {

            expect(email().validate('a@a.a.a.aa')).to.be.true;

        });

        it('valid', () => {

            expect(email().validate('alfredorevilla@gmail.com')).to.be.true;

        });

        it('invalid', () => {

            expect(email().validate('alfredorevilla@gmail.c')).to.be.false;

        });

        it('invalid', () => {

            expect(email().validate('alfredorevilla@gmail.co.c')).to.be.false;

        });

        it('invalid', () => {

            expect(email().validate('alfredorevilla@gmail.co.co.c')).to.be.false;

        });

        it('invalid', () => {

            expect(email().validate('alfredorevilla@gmail')).to.be.false;

        });

        it('invalid', () => {

            expect(email().validate('alfredorevilla')).to.be.false;

        });

        it('invalid on empty', () => {

            expect(email().validate('')).to.be.false;

        });


        it('invalid on null', () => {

            expect(email().validate(null)).to.be.false;

        });

        it('invalid on undefined', () => {

            expect(email().validate(undefined)).to.be.false;

        });

    });

});