const errorHandler = (err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ error: 'Internal server error: ' + err.message });
};

export default errorHandler;