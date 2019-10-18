module.exports = {
    handleError: (err, page) => {
        let firstKey = Object.keys(err.errors)[0]
        let message = err.errors[firstKey].message
        res.locals.globalError = message;
        res.render(page);
    }
}