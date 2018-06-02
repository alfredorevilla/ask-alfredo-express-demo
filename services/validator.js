'use strict';
/*
    todo: move each object/class into its own file??
*/

/*
    todo: remove validate methods in order to make it validator implementation agnostic??
*/
const validationAttributes = {
    required: () => { return { validate: (validatable) => validatable !== undefined && validatable !== null && (typeof validatable !== 'string' || validatable.length > 0) }; },
    minValue: (value) => { return { validate: (validatable) => validatable && validatable >= value }; },
    maxValue: (value) => { return { validate: (validatable) => validatable && validatable <= value }; },
    //  todo:review
    minLength: (value) => { return { validate: (validatable) => validatable && validatable.length && validatable.length >= value }; },
    maxLength: (value) => { return { validate: (validatable) => validatable.length <= value } },
    element: (schema) => {
        return { validate: (validatable) => { if (validatable && Array.isArray(validatable)) { validatable.forEach(item => validator.validate(item, schema)); return true; } } }
    },
    email: () => { return { validate: (validatable) => typeof validatable === 'string' && /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(validatable.toLowerCase()) } },
    oneOf: (value) => { if (!Array.isArray(value)) throw Error('Value must be an array'); return { validate: (validatable) => value.indexOf(validatable) !== -1 } }
};

class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

const validator = {
    validate(obj, schema) {

        if (!obj)
            throw Error('Cannot validate null or undefined object');
        if (!schema)
            throw Error('Cannot validate using a null or undefined schema');

        for (var key1 in schema) {
            var validators = schema[key1];
            if (validators && Array.isArray(validators)) {
                for (var i = 0; i < validators.length; i++) {
                    var element = validators[i];
                    if (element.validate instanceof Function) {
                        var value = obj[key1];
                        if (!element.validate(value))
                            throw new ValidationError(`Validation failed for member ${key1}`);
                    }
                }
            }
        }
    },
    isValid(obj, schema) {
        try {
            this.validate(obj, schema);
            return true;
        } catch (e) {
            return false;
        }
    }
};

module.exports = Object.assign(validationAttributes, { validator, validationAttributes, ValidationError });
