import { Grid, TextField, Button, Box, Typography, Tooltip } from '@mui/material';

const threeTopMovie = [
  //mock data
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
  },
  {
    img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
  },
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
];

const movieDetail = [
  {
    title: 'Queenmaker',
    cast: 'Kim Heeae / Moon So-ri',
    genre: 'Drama',
    plot: 'ซีรีส์ที่จะเล่าเรื่องราวของผู้หญิง 2 คนที่ใช้ชีวิตแตกต่างกันอย่างสิ้นเชิง จับมือกันและละทิ้งทุกวิถีทางที่เคยมีมาทั้งหมด เพื่อสร้างโลกที่คงไว้ซึ่งความยุติธรรมและความจริง',
  },
];

const movieDetails = [
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
    title: 'Queenmaker',
    cast: 'Kim Heeae / Moon So-ri',
    genre: 'Drama',
    plot: 'ซีรีส์ที่จะเล่าเรื่องราวของผู้หญิง 2 คนที่ใช้ชีวิตแตกต่างกันอย่างสิ้นเชิง จับมือกันและละทิ้งทุกวิถีทางที่เคยมีมาทั้งหมด เพื่อสร้างโลกที่คงไว้ซึ่งความยุติธรรมและความจริง',
  },
];

const MovieTooltipContent = ({ detail }) => {
  if (!detail) {
    return null;
  }

  return (
    <Box sx={{ color: '#fff', padding: '10px', borderRadius: '4px', maxWidth: '400px' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {detail.title}
      </Typography>
      <Typography variant="body2">นักแสดงนำ: {detail.cast}</Typography>
      <Typography variant="body2">ประเภท: {detail.genre}</Typography>
      <Typography variant="body2">{detail.plot}</Typography>
    </Box>
  );
};

export default function HomePage() {
  const getMovieDetailByImg = img => movieDetails.find(detail => detail.img === img) || null;
  return (
    <Grid container style={{ backgroundColor: '#000000', minHeight: '91.5vh' }}>
      <Grid item sx={{ mb: 8, width: '100%' }}>
        <Grid
          item
          xs={12}
          sx={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            placeholder="Search for topics of interest"
            variant="outlined"
            sx={{
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
              width: '40%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ffffff',
                },
              },
            }}
          />
          <Grid item sx={{ margin: '20px' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#f3edce',
                color: '#0a0a0a',
                '&:hover': {
                  backgroundColor: '#e0d4b3',
                },
              }}
            >
              find
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {threeTopMovie.map(item => (
            <Tooltip key={item.img} title={<MovieTooltipContent detail={getMovieDetailByImg(item.img)} />} arrow>
              <Box
                sx={{
                  width: 400,
                  height: 300,
                  marginInline: 1,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <img src={`${item.img}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Box>
            </Tooltip>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{
            ml: 5,
            marginTop: 4,
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          Made in Chinese
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '150px' }}>
          {moviesList.map(item => (
            <Box key={item.img} sx={{ width: 200, height: 150, marginInline: '8px' }}>
              <img src={`${item.img}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{
            ml: 5,
            marginTop: 2,
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          Made in English
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '150px' }}>
          {moviesList.map(item => (
            <Box key={item.img} sx={{ width: 200, height: 150, marginInline: '8px' }}>
              <img src={`${item.img}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{
            ml: 5,
            marginTop: 2,
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          Made in Japanese
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '150px' }}>
          {moviesList.map(item => (
            <Box key={item.img} sx={{ width: 200, height: 150, marginInline: '8px' }}>
              <img src={`${item.img}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{
            ml: 5,
            marginTop: 2,
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          Made in Korean
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '150px' }}>
          {moviesList.map(item => (
            <Box key={item.img} sx={{ width: 200, height: 150, marginInline: '8px' }}>
              <img src={`${item.img}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          ))}
        </Box>
        <Typography
          variant="h6"
          sx={{
            ml: 5,
            marginTop: 2,
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          Made in Thai
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '150px' }}>
          {moviesList.map(item => (
            <Box key={item.img} sx={{ width: 200, height: 150, marginInline: '8px' }}>
              <img src={`${item.img}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

// 'Chinese', 'England', 'Japan', 'Korea', 'Thai'
