const searchHelper = (searchKey, query, req) => {
    if(req.query.search) {
        const searchObject = {};

        const regex = new RegExp(req.query.search, "i");
        searchObject[searchKey] = regex;

        return query.where(searchObject);
    }
    return query;
}

const populateHelper = (query, population) => {
    return query.populate(population);
}

const projectSortHelper = (query, req) => {
    const sortKey = req.query.sortBy;

    if(sortKey === "title") {
        return query.sort("title");
    }
    if(sortKey === "start-date") {
        return query.sort("-startingDate");
    }
    if(sortKey === "completion-date") {
        return query.sort("-completionDate");
    }
    return query.sort("-createdAt");
}

const userSortHelper = (query, req) => {
    const sortKey = req.query.sortBy;

    if(sortKey === "organization-name") {
        return query.sort("organizationName");
    }
    return query.sort("name");
}

const userFilterHelper = (model, req) => {
    const roleFilter = req.query.role;
    const organizationFilter = req.query.organization;
    const filterObject = {};

    if(roleFilter) {
        filterObject["role"] = roleFilter;
    }
    if(organizationFilter) {
        filterObject["organization"] = organizationFilter;
    }

    return model.find(filterObject);
}

const paginationHelper = async (model, query, req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = await model.countDocuments();

    if(startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        };
    }

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        };
    }
    
    return {
        query: query.skip(startIndex).limit(limit),
        pagination: pagination
    };
}

module.exports = {
    searchHelper,
    populateHelper,
    projectSortHelper,
    userSortHelper,
    userFilterHelper,
    paginationHelper
}