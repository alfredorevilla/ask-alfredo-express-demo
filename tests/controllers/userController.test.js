'use strict';

require('chai');
const userService = { async add() { } };
const userController = require('../../controllers/userController')(userService);

/*
    todo: complete this and add rest of controller tests
    note: here the normal route would be to use an request and response mock but let's try to decouple controller methods from express so they become more easy to test.
*/  
describe('userController', () => {


    describe('post', () => {

        it('succeed', () => {

        });

        it('fails', () => {

        });

    });

});

