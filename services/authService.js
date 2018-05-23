module.exports = class authService {
    constructor(userStore, passwordValidator) {
        this.userStore = userStore;
        this.passwordValidator = passwordValidator;
    }
    async login(email, password) {
        var user = this.userStore.getByEmail(email);
        if (!user)
            return false;
        return await this.passwordValidator.tryValidate(this.userStore.getHashedPassword(email), password);
    }
}