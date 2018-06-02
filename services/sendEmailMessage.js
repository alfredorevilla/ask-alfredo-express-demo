const config = require('./sendEmailMessage.config.json');
const apikey = config.apikeys[process.env['NODE_ENV']];

/*
    todo: made log function injectable so it's test friendly
*/
module.exports = (dest, subject, message, log) => console.info(apikey ? `Mail text using api key ${apikey} and arguments ${JSON.stringify({ dest, subject, message })}` : 'No apikey set, cannot send email.')

