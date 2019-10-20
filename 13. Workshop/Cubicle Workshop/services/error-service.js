module.exports = {
    handleError: (res, err, page) => {
        let firstKey = Object.keys(err.errors)[0];
        let message = err.errors[firstKey].message;
        res.locals.globalError = message;
        res.render(page);
    },

    credentialError: (res, message) => {
        res.locals.globalError = message;
        res.render('users/login');
        return;
    }
}