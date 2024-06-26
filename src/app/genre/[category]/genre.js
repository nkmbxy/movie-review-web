'use client';
import { useState, useEffect } from 'react';
import { Typography, Grid, Box, Rating, Tooltip } from '@mui/material';
import { axiosInstance } from '@/lib/axiosInstance';
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";

const MovieTooltipContent = ({ detail }) => {

  const router = useRouter();

  if (!detail) {
    return null;
  }

  const maxSynopsisLength = 150;
  const isLongSynopsis = detail.synopsis.length > maxSynopsisLength;
  const synopsisToShow = isLongSynopsis ? `${detail.synopsis.slice(0, maxSynopsisLength)}...` : detail.synopsis;

  const handleReadMoreClick = () => {
    router.push(`/movieReview/${detail.review_id}`);
  };

  return (
    <Box sx={{ color: '#fff', padding: '10px', borderRadius: '4px', maxWidth: '400px' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {detail.title}
      </Typography>
      <Rating name="rating" value={detail.score} readOnly />
      <Typography variant="body2">นักแสดงนำ: {detail.actor}</Typography>
      <Typography variant="body2">ประเภท: {detail.genre_id.genre}</Typography>
      <Typography variant="body2">
        {synopsisToShow}
        {isLongSynopsis && (
          <Typography
            variant="body2"
            component="span"
            sx={{ color: '#909090', cursor: 'pointer' }}
            onClick={handleReadMoreClick}
          >
            Read More
          </Typography>
        )}
      </Typography>
  </Box>
  );
};

export default function GenrePage() {

  const Router = useRouter();

  const [moviesSortByGenre, setMoviesSortByGenre] = useState([]);
  const params = useParams();

  const fetchMoviesSortByGenre = async () => {
    try {
      const response = await axiosInstance.get(`/genre/movieSortByGenre?genre=${params.category}`);
      setMoviesSortByGenre(response.data.data.movie_id);
    } catch (error) {
      console.error('Error getting MoviesSortByGenre:', error);
      throw error;
    }
  };
  console.log(moviesSortByGenre);

  useEffect(() => {
    fetchMoviesSortByGenre();
  }, []);

  return (
    <Grid
      container
      style={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid item sx={{ marginTop: '20px' }}>
        <Typography
          variant="h4"
          sx={{
            ml: 5,
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          {params.category.toUpperCase()}
        </Typography>
      </Grid>

      <Grid container sx={{ width: '100%', padding: 2 }}>
        <Grid
          container
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
          }}
        >
          {moviesSortByGenre.map((item, index) => (
            <Grid key={index} sx={{ margin: 1, position: 'relative' }}>
              <Tooltip key={item.image} title={<MovieTooltipContent detail={item} />} arrow>
                <Box
                  sx={{
                    marginInline: '8px',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                  onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                >
                  <img
                    src={`${item.image}`}
                    style={{
                      width: '265px',
                      height: '165px',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
