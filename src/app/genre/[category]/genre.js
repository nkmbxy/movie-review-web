'use client';

import { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { axiosInstance } from '@/lib/axiosInstance';
import { useParams } from 'next/navigation';

export default function GenrePage() {
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
  });

  return (
    <>
      <Grid
        container
        style={{
          backgroundColor: '#000000',
          minHeight: '100vh',
        }}
      >
        <Grid item sx={{ marginTop: '15px' }}>
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
        <Grid
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            backgroundColor: '#000000',
            width: '100%',
            minHeight: '100vh',
            padding: 3,
          }}
        >
          {moviesSortByGenre.map(item => (
            <Grid key={item.img} sx={{ width: 200, height: 200, margin: 1 }}>
              <img src={`${item.image}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
