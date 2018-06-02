'use-strict';
const expect = require('chai').expect;
const sendEmailMessage = require('../services/sendEmailMessage');

/*
    todo: make the logger injeactable in order to avoid mocking the logging function (info) and guessing what's going on inside the sendEmailMessage function
*/
let output = null;
const node_env = 'NODE_ENV';
const env = process.env[node_env];
describe('sendEmailMessage', () => {

    before(() => {
        console.info = (message) => output = 'Mocked output: ' + message;
    });

    it('prints No apikey set ... to console on null or empty env', () => {

        /*
            todo: research and review the risks of changing env variables for the rest of tests
        */
        process.env[node_env] = '';
        sendEmailMessage('', '', '');

        expect(output).to.contain('No apikey set');

    });

    it('prints No apikey set ... to console on unknown env', () => {

        process.env[node_env] = 'sdasdsa';

        sendEmailMessage('', '', '');

        expect(output).to.contain('No apikey set');

    });

    it('prints Mail text ... to console on production env', () => {

        process.env[node_env] = 'production';

        sendEmailMessage('', '', '');

        expect(output).to.contain('Mail text');

    });

    it('prints Mail text ... to console on sandbox env', () => {

        process.env[node_env] = 'sandbox';

        sendEmailMessage('', '', '');

        expect(output).to.contain('Mail text');

    });

    after(() => process.env[node_env] = env);

});