require('chai');
const userService = { async add() { } };
const userController = require('../../controllers/userController')(userService);

/*
    todo: complete
*/  
describe('userController', () => {


    describe('post', () => {

        it('succeed', () => {

            const res = {

            }
            userController.handle({ body: {} }, res, () => { });

        });

        it('fails', () => {

            userService.add = async () => {
                debugger
                throw Error('faked')
            };

            const res = {

            }
            const req = require('express').request;            
            const next = (err) => {
                debugger;
                if (err)
                    throw err;
            }

            userController.handle(req, res, next);

        });

    });

});

