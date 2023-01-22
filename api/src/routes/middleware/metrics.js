const express = require("express");
const client = require("prom-client");

const app = express();
const corsMiddleware = require("./cors-middleware");

app.use(corsMiddleware);

function runMetricServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", "application/json");

    return res.send(await client.register.getMetricsAsJSON());
  });

  app.listen(3001, () => {
    console.log("Metrics server is running at http://localhost:3001");
  });
}

module.exports = runMetricServer;
