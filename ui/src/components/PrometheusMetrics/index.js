import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { styled } from "@mui/material/styles";

import { axiosGetMetrics } from "../../api/api";

export const PrometheusMetrics = () => {
  const [prometheusMetrics, setPrometheusMetrics] = useState("");
  const timeEndpoint = "/metrics";

  const StyledCard = styled(Card)`
    margin: 2rem 2rem 0rem 2rem;
  `;

  const ContentArrangement = styled(Box)`
    font-family: Georgia, serif;
    padding: 1rem 2rem 1rem 2rem;
  `;

  function parsePrometheusMetrics(response) {
    setPrometheusMetrics(JSON.stringify(response[0]));
  }

  /**
   * Fetches the prometheus metrics from the API with the given endpoint.
   * @param {string} endpoint The API Endpoint to get request
   */
  function fetchPrometheusMetrics(endpoint) {
    axiosGetMetrics(endpoint)
      .then((response) => {
        if (response) {
          parsePrometheusMetrics(response);
        }
      })
      .catch((error) => {
        console.log("An error occurred while fetching Epoch time: " + error);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrometheusMetrics(timeEndpoint);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      {prometheusMetrics && (
        <StyledCard>
          <ContentArrangement>
            <SyntaxHighlighter language="javascript">
              {prometheusMetrics}
            </SyntaxHighlighter>
          </ContentArrangement>
        </StyledCard>
      )}
    </div>
  );
};
