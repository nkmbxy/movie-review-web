import { Grid, TextField, Button, Box, Typography } from "@mui/material";

const threeTopMovie = [ //mock data
    {
        img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
    },
    {
        img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
    },
    {
        img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
    }
];

const moviesList = [
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
  },
  {
    img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
  },
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
  },
  {
    img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
  },
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  }
]

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
              width: "30%",
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {threeTopMovie.map((item) => (
            <Box key={item.img} sx={{ width: 400, height: 300, margin: 1,transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",}}}>
                <img
                    src={`${item.img}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </Box>
          ))}
        </Box>
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <Typography
            variant="h6" 
              sx={{
                  ml: 5,
                  marginTop:4,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}>
              Made in Chinese 
          </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {moviesList.map((item) => (
                  <Box key={item.img} sx={{ width: 200, height: 200, margin: 1}}>
                      <img
                          src={`${item.img}`}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                  </Box>
              ))}
          </Box>
      </Grid>
    </Grid>
  );
}

// 'Chinese', 'England', 'Japan', 'Korea', 'Thai'