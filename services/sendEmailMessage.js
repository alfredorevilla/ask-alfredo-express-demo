'use strict';

const config = require('./sendEmailMessage.config.json');

/*
    todo: made log function injectable so it's test friendly.
    todo: avoid making this long running.
*/
module.exports = (dest, subject, message) => {
    const api_key = config.apikeys[process.env['NODE_ENV']];
    console.info(api_key ? `Mail text using api key ${api_key} and arguments ${JSON.stringify({ dest, subject, message })}` : 'No apikey set, cannot send email.');
}

