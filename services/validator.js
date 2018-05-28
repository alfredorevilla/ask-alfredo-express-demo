'use strict';

//  todo: remove validate methods in order to make it validator implementation agnostic
const validationAttributes = {
    required: () => { return { validate: (validatable) => validatable }; },
    minValue: (value) => { return { validate: (validatable) => validatable && validatable >= value }; },
    maxValue: (value) => { return { validate: (validatable) => validatable && validatable <= value }; },
    //  todo:review
    minLength: (value) => { return { validate: (validatable) => validatable && validatable.length && validatable.length >= value }; },
    maxLength: (value) => { return { validate: (validatable) => validatable <= value } },
    element: (schema) => {
        return { validate: (validatable) => { if (validatable && Array.isArray(validatable)) { validatable.forEach(item => validator.validate(item, schema)); return true; } } }
    },
    email: (value) => { return { validate: (validatable) => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(validatable.toLowerCase()) } },
    oneOf: (value) => { return { validate: (validatable) => value.indexOf(validatable) !== -1 } }
};

const validator = {
    validate(obj, schema) {

        if (!obj)
            throw Error('Cannot validate null or undefined object');
        if (!schema)
            throw Error('Cannot validate using a null or undefined schema');

        for (const key1 in schema) {
            var validators = schema[key1];
            if (validators && Array.isArray(validators)) {
                for (let i = 0; i < validators.length; i++) {
                    const element = validators[i];
                    if (element.validate instanceof Function) {
                        var value = obj[key1];
                        if (!element.validate(value))
                            throw Error(`Validation failed for member ${key1}`)
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

module.exports = {
    validator,
    validationAttributes
};
