const asyncErrorWrapper = require('express-async-handler');
const { searchHelper, userSortHelper, userFilterHelper, paginationHelper } = require('./queryMiddlewareHelpers');

const userQueryMiddleware = function(model) {

    return asyncErrorWrapper(async function(req, res, next) {
        let query;
        
        query = userFilterHelper(model, req);

        query = searchHelper("name", query, req);

        query = userSortHelper(query, req);

        const paginationResult = await paginationHelper(model, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;
        const queryResults = await query;

        res.status(200).queryResults = {
            success: true,
            count: queryResults.length,
            pagination: pagination,
            data: queryResults
        };

        next();
    });
}

module.exports = userQueryMiddleware