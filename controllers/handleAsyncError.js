/*
    By design express won't handle any rejected (faulty) promise so we must handle any error and pass it to the next middleware. This function works like a wrapper to avoid repeating such handling in each controller call.
*/
module.exports = action =>
    async (req, res, next) => {
        try {
            await action(req, res, next);
        } catch (e) {
            next(e);
        }
    };