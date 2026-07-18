const notFoundHandler = (req, res) => {
    res.status(404).json({ success: false, message: "Route not found on Gateway" });
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal Gateway Error" });
};

module.exports = {notFoundHandler,errorHandler};
