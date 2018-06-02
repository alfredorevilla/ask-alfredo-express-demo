/*
    todo: since its heavily used it maybe a good idea to move validator to the globals module.
    
*/
const { required } = require('../services/validator')
const { ArgumentsValidator } = require('../globals');

/*
    No hashing but encoding just for testing/development purposes
    Warning: DO NOT use in production
*/
const base_64 = 'base64';
module.exports = {
    verifyHashedPassword(hashedPassword, clearPassword) {
        ArgumentsValidator.validate({ hashedPassword, clearPassword }, { clearPassword: [required()], hashedPassword: [required()] })
        return Buffer.from(hashedPassword, base_64).toString() === clearPassword
    },
    hashPassword(clearPassword) {
        ArgumentsValidator.validate({ clearPassword }, { clearPassword: [required()] })
        return Buffer.from(clearPassword).toString(base_64);
    }
};


