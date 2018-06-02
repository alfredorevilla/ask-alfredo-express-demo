'use-strict';

const expect = require('chai').expect;
const { email, required, validator, oneOf } = require('../services/validator');

describe('validationAttributes', () => {


    describe('oneOf', () => {

        it('valid', () => {

            expect(oneOf(['ask', 'jack']).validate('ask')).to.be.true;

        });

        it('valid', () => {

            expect(oneOf(['ask', 'jack']).validate('jack')).to.be.true;

        });

        it('valid', () => {

            expect(oneOf([1, 2]).validate(1)).to.be.true;

        });

        it('valid', () => {

            expect(oneOf([1, 2]).validate(2)).to.be.true;

        });

        it('invalid', () => {

            expect(oneOf([1, 2]).validate(3)).to.be.false;

        });


        it('invalid', () => {

            expect(oneOf([1, 2]).validate('1')).to.be.false;

        });

        it('invalid', () => {

            expect(oneOf([1, 2]).validate('1')).to.be.false;

        });

        it('invalid', () => {

            expect(oneOf([]).validate(1)).to.be.false;

        });



    });

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