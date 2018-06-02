'use strict';

module.exports =
    (userStore = require('../models/quoteStore'), passwordHasher = require('./weakPasswordHasher')) => ({
        async login({ email, password }) {
            var user = await userStore.getByEmail(email);
            if (!user)
                return false;
            return await passwordHasher.verifyHashedPassword(userStore.getHashedPassword(user), password);
        }
    });