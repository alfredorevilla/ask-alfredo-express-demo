'use strict';

const validationAttributes = {
    required: () => { return { validate: (validatable) => validatable }; },
    minValue: (value) => { return { validate: (validatable) => validatable && validatable >= value }; },
    maxValue: (value) => { return { validate: (validatable) => validatable && validatable <= value }; },
    minLength: (value) => { return { validate: (validatable) => validatable && validatable.length && validatable.length >= value }; }
}

const validator = {
    validate(obj, schema) {
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
}

module.exports = {
    validator,
    validationAttributes
}
