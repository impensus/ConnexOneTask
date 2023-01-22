import { Box, Card } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";

import { axiosGetTime } from "../../api/api";

export const TimeDisplay = () => {
  const [serverEpochTime, setServerEpochTime] = useState(Date.now);
  const [differenceEpochTime, setDifferenceEpochTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const hasInitialLoadRef = useRef(false);
  const timeEndpoint = "/time";

  const StyledCard = styled(Card)`
    margin: 2rem 2rem 0rem 2rem;
  `;

  const ContentArrangement = styled(Box)`
    font-family: Georgia, serif;
    padding: 0rem 2rem 0rem 2rem;
  `;

  /**
   * Fetches the epoch time from the server, using the endpoint passed into the function.
   * @param {string} endpoint The API Endpoint to get request
   */
  function fetchServerEpochTime(endpoint) {
    setIsLoading(true);
    axiosGetTime(endpoint)
      .then((response) => {
        if (response) {
          let serverResponseTime = response.time;
          setServerEpochTime(serverResponseTime);
        }
      })
      .catch((error) => {
        console.log("An error occurred while fetching Epoch time: " + error);
      });
    setIsLoading(false);
  }

  /**
   * Calculates a time in format 00:00:00 from a given epoch time.
   * @param {Date} epochTime Epoch time to format (in seconds)
   * @returns {number} timeString Date time formatted to 00:00:00
   */
  function formatEpochTime(epochTime) {
    let timeString = new Date(epochTime).toISOString().substring(11, 19);
    return timeString;
  }

  /**
   * Calculates the difference in time in seconds, between two
   * values which are dates of epoch time. Is async to allow for
   * timeout for you to test the function.
   */
  function calculateTimeDifference() {
    let localEpochTime = new Date().getTime();

    let localDate = new Date(localEpochTime);
    let serverDate = new Date(serverEpochTime);

    let secondsDifference = localDate.getTime() - serverDate.getTime();
    setDifferenceEpochTime(secondsDifference);
  }

  /*
   * Fetches the server epoch time, and calculates the time difference from
   * the local machine. Only fetches these values for the initial load.
   */
  useEffect(() => {
    if (!hasInitialLoadRef.current) {
      fetchServerEpochTime(timeEndpoint);
      calculateTimeDifference();
      hasInitialLoadRef.current = true;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let newDifferenceEpoch = differenceEpochTime + 1000;
      setDifferenceEpochTime(newDifferenceEpoch);
    }, 1000);
    return () => clearInterval(interval);
  }, [differenceEpochTime]);

  return (
    <>
      {isLoading && <h1>Component is loading!</h1>}

      {!isLoading && (
        <StyledCard>
          <ContentArrangement>
            <h2>
              Server Time {"Epoch"}: {serverEpochTime}
            </h2>
            <h2>
              Time Difference value: {formatEpochTime(differenceEpochTime)}
            </h2>
          </ContentArrangement>
        </StyledCard>
      )}
    </>
  );
};
