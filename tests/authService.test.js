const authService = new (require('../services/authService'))({}, {});

describe('AuthService', () => {
    it('Is', (done) => {
        if (authService)
            done();
        else
            done('sadasdsa');
    })
});