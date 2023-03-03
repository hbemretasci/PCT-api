const asyncErrorWrapper = require('express-async-handler');
const { searchHelper, populateHelper, projectSortHelper, paginationHelper } = require('./queryMiddlewareHelpers');

const projectQueryMiddleware = function(model, options) {

    return asyncErrorWrapper(async function(req, res, next) {
        let query = model.find();

        query = searchHelper("title", query, req);

        if(options && options.population) {
            query = populateHelper(query, options.population);
        }

        query = projectSortHelper(query, req);

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

module.exports = projectQueryMiddleware