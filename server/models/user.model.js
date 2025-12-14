const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        // required:true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photos: {
        type: String,
        // required:true
    }
}, {
    timeStamps: true
})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel