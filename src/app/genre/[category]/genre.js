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
            item
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              overflowX: 'auto',
            }}
          >
            {moviesSortByGenre.map(item => (
              <Grid key={item.img} sx={{ margin: 1, minWidth: 150, height: 150 }}>
                <img src={`${item.image}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}