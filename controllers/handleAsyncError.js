/*
    By design express won't respond with a 500 status code for  rejected promises so we must wrapper any call to and handle the error to the next middleware.
*/
module.exports = action =>
    async (req, res, next) => {
        try {
            await action(req, res, next);
        } catch (e) {
            next(e);
        }
    };