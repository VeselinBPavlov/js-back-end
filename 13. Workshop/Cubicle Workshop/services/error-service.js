module.exports = {
    handleError: (err, page) => {
        let message = errorHandler.handleMongooseError(err);
        res.locals.globalError = message;
        res.render(page);
    }
}