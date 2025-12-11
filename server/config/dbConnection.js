const mongoose = require("mongoose")
require("dotenv").config()

const dbConnection = ()=>{
    return mongoose.connect(process.env.MONGOOSE_STRING)
}

module.exports = dbConnection