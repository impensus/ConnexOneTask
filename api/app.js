const express = require("express");
const app = express();
const corsMiddleware = require("./src/routes/middleware/cors-middleware");
const runMetricServer = require("./src/routes/middleware/metrics");

app.use(corsMiddleware);

app.get("/time", require("./src/routes/time"));
app.get("/metrics", require("./src/routes/middleware/metrics"));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
  runMetricServer();
});
