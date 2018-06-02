'use strict';

const { validator, ValidationError } = require('./services/validator');

class InvalidArgumentError extends Error {
    constructor(argumentName) {
        if (!argumentName)
            throw new InvalidArgumentError('argumentName');
        super(`Argument ${argumentName} is not valid`);
    }
}

const ArgumentsValidator = {
    validate(args = {}, schema = {}) {
        try {
            validator.validate(args, schema);
        } catch (e) {
            if (e instanceof ValidationError)
                throw new InvalidArgumentError(e.member);
            throw e;
        }
    }
}

module.exports = { InvalidArgumentError, ArgumentsValidator };