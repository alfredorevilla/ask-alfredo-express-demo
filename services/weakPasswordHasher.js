module.exports = {
    verifyHashedPassword(hashedPassword, clearPassword) {
        return hashedPassword && clearPassword && hashedPassword === clearPassword;
    },
    hashPassword(clearPassword) {
        return clearPassword;
    }
};