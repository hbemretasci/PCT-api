const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'solutions',
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected to DB successfully.");
    })
    .catch(err => {
        console.error(`DB connection error: ${err}`);
    })
}

module.exports = connectDatabase