function corsMiddleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  next();
}

module.exports = corsMiddleware;
