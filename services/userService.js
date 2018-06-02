'use strict';

const { validator, validationAttributes } = require('./validator');

module.exports = (userStore = require('../models/userStore')(), validationService = validator, sendEmailMessage = require('./sendEmailMessage')) => {
    return {
        /*
            keep using default values helps with intellisense on vs code and vs.
        */
        async add(user = { name, email, type, password }) {
            validator.validate(user, {
                name: [validationAttributes.required(), validationAttributes.minLength(10), validationAttributes.maxLength(255)],
                email: [validationAttributes.required(), validationAttributes.email()],
                type: [validationAttributes.required(), validationAttributes.oneOf(['consumer', 'contractor'])],
                password: [validationAttributes.required(), validationAttributes.minLength(6)]
            });
            await userStore.add(user);
            /* 
                todo: sendEmailMessage should not be long running to avoid blocking the response. submit message to a service or queue for later processing.
            */
            sendEmailMessage(email, 'Your AskJack user account has been created',$`Congratulations! The account ${name} has been created`);
        }
    }
};