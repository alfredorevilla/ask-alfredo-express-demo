'use strict';

/*
    note: cool 1 line import
*/
const { expect } = require('chai')
    , http_mocks = require('node-mocks-http')
    , service = { async add() { } }
    , controller = require('../../controllers/userController')(service);

/*
    todo: complete this and add rest of controller tests
    note: let's try to decouple controller methods from express so they become more easy to test and also allow to avoid mocking http objects.
*/
describe('userController', () => {

    describe('post', () => {

        it('returns status 200 on success', (done) => {

            const req = http_mocks.createRequest({ method: 'post', url: '/' })
                , res = http_mocks.createResponse({
                    eventEmitter:require('events').EventEmitter
                });
            res.on('end', () => {

                expect(res.statusCode).to.equals(200);
                done();

            });

            controller.handle(req, res);

        });

        it('calls next middleware on error', (done) => {

            service.add = async () => { throw Error(); };
            const req = http_mocks.createRequest({ method: 'post', url: '/' })
                , res = http_mocks.createResponse();

            controller.handle(req, res, (err) => {
                expect(err).to.be.instanceOf(Error);
                done();
            });

        });

    });

});

