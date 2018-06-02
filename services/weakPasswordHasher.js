/*
    No hashing but encoding just for testing/development purposes
    Warning: DO NOT use in production
*/
const base_64 = 'base64';
module.exports = {
    verifyHashedPassword: (hashedPassword, clearPassword) => Buffer.from(hashedPassword, base_64).toString() === clearPassword,
    hashPassword: (clearPassword) => Buffer.from(clearPassword).toString(base_64)
};