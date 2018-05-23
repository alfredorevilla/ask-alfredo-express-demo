module.exports = class {
    constructor(userStore, passwordHasher) {
        this.userStore = userStore;
        this.passwordHasher = passwordHasher;
    }
    async login(email, password) {
        var user = await this.userStore.getByEmail(email);
        if (!user)
            return false;
        return await this.passwordHasher.verifyHashedPassword(this.userStore.getHashedPassword(user), password);
    }
}