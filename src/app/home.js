"use client";

import { Grid, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Grid container sx={{ mb: 8 }}>
      <Grid item xs={12} sx={{ marginBottom: "20px" }}>
        <Typography style={{ fontWeight: "bold", fontSize: "30px" }}>
          NEW ARRIVAL
        </Typography>
      </Grid>
    </Grid>
  );
}
