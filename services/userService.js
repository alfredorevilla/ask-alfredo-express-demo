const { validator, validationAttributes } = require('./validator');

module.exports = (userStore, validationService = validator) => {
    return {
        async add(user = { name, email, type, password }) {
            validator.validate(user, {
                name: [validationAttributes.required(), validationAttributes.minLength(10), validationAttributes.maxLength(255)],
                email: [validationAttributes.required(), validationAttributes.email()],
                type: [validationAttributes.required(), validationAttributes.oneOf('consumer', 'contractor')],
                password: [validationAttributes.required(), validationAttributes.minLength(6)]
            });
            await userStore.add(user);
        }
    }
};