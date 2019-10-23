module.exports = {
    handleError: (res, err, page) => {
        console.log(err);
        res.locals.globalError = err;
        res.render(page);
    }
}