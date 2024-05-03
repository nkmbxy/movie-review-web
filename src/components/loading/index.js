import React from "react";
import { Grid } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

function MyLoader() {
  return (
    <Grid
      container
      className="sweet-loading"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader color="lightpink" loading={true} size={200} />
    </Grid>
  );
}

export default MyLoader;
