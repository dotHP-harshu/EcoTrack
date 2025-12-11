const mongoose  = require("mongoose")

const cfhSchema = mongoose.Schema({
    totalEmission:{
        type:Number,
        required:true
    },
    categoryEmission:{
        type:Object,
        required:true
    },
    categoryBreakdown:{
        type:Object,
        required:true
    },
    categoryTips:{
        type:Array,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"user"
    }
    
}, {timestamps:true})

module.exports = mongoose.model("cfh", cfhSchema)