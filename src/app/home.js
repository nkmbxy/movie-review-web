import { Grid, TextField, Button } from "@mui/material";

export default function HomePage() {
  return (
    <Grid container style={{ backgroundColor: "#000000", minHeight: "91.5vh" }}>
      <Grid item sx={{ mb: 8, width: "100%" }}>
        <Grid
          item
          xs={12}
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search for topics of interest"
            variant="outlined"
            sx={{
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              borderRadius: "4px",
              width: "25%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ffffff",
                },
              },
            }}
          />
          <Grid item sx={{ margin: "20px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f3edce",
                color: "#0a0a0a",
                "&:hover": {
                  backgroundColor: "#e0d4b3",
                },
              }}
            >
              find
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
