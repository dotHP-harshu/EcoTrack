const sendSuccess = (res, isSuccess, status, message, data)=>{
    return res.status(status).json({status, isSuccess, message, data})
}

const sendError = (res, isSuccess, status, message, error)=>{
    return res.status(status).json({status, isSuccess, message, error})
}

module.exports = {sendError, sendSuccess}