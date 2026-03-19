const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Nếu status code hiện tại là 200 thì đổi thành 500
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Ẩn stack trace nếu ở môi trường production
    });
};

module.exports = {errorHandler};

// Middleware này sẽ được sử dụng để xử lý lỗi trong toàn bộ ứng dụng. Khi có lỗi xảy ra, nó sẽ trả về một response JSON chứa thông tin về lỗi, bao gồm message và stack trace (nếu không phải ở môi trường production). 