
class customError extends Error {
    constructor(message, statusCode, data) {
        super(message);
        this.status = statusCode;
        this.data = data;
    }
}



module.exports = customError