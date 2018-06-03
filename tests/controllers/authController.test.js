'use strict';

/*
    note: cool 1 line import
*/
const { expect } = require('chai')
    , http_mocks = require('node-mocks-http')
    , service = {}
    , validator = { validate: () => { } }
    , controller = require('../../controllers/authController')(service, validator);

/*
    todo: complete this and add rest of controller tests
    note: let's try to decouple controller methods from express so they become more easy to test and also allow to avoid mocking http objects.
*/
describe('authController', () => {

    describe('login', () => {

        it('returns status 200 on success', (done) => {

            const req = http_mocks.createRequest({ method: 'post', url: '/login' })
                , res = http_mocks.createResponse({
                    eventEmitter: require('events').EventEmitter
                });
            service.login = async () => true;
            res.on('end', () => {

                expect(res.statusCode).to.equals(200);
                done();

            });

            controller.handle(req, res, done);

        });

        it('returns status 403 on failure', (done) => {

            const req = http_mocks.createRequest({ method: 'post', url: '/login' })
                , res = http_mocks.createResponse({
                    eventEmitter: require('events').EventEmitter
                });
            service.login = async () => false;
            res.on('end', () => {

                expect(res.statusCode).to.equals(403);
                done();

            });

            controller.handle(req, res, done);

        });

    });

});

