const CustomError = require('../../helpers/error/CustomError');

const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if(err.name === "MongooseError") {
        customError = new CustomError("Database connection error.", 400);
    }
    if(err.name === "SyntaxError") {
        customError = new CustomError("Unexpected syntax.", 400);
    }
    if(err.name === "ValidationError") {
        customError = new CustomError("Validation error.", 400);
    }
    if(err.code === 11000) {
        customError = new CustomError("This email is already registered, please check your input.", 400);
    }
    if(err.name === "CastError") {
        customError = new CustomError("Please provide a valid id.", 400);
    }
    
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    });
}

module.exports = customErrorHandler