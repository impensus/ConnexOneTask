import React from "react";

import { styled } from "@mui/material/styles";

import { TimeDisplay } from "../../components/TimeDisplay";
import { PrometheusMetrics } from "../../components/PrometheusMetrics";
import { Box, Grid } from "@mui/material";

const StyledGrid = styled(Grid)`
  justify-content: center;
  min-width: 95%;
`;

export const Homepage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledGrid container direction={"row"} spacing={16}>
        <Grid item xl={6} md={6} sm={12} xs={12}>
          <TimeDisplay />
        </Grid>
        <Grid item xl={6} md={6} sm={12} xs={12}>
          <PrometheusMetrics />
        </Grid>
      </StyledGrid>
    </Box>
  );
};
