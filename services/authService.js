module.exports = class {
    constructor(userStore, passwordValidator) {
        this.userStore = userStore;
        this.passwordValidator = passwordValidator;
    }
    async login(email, password) {
        var user = await this.userStore.getByEmail(email);
        if (!user)
            return false;
        return await this.passwordValidator.tryValidate(this.userStore.getHashedPassword(email), password);
    }
}