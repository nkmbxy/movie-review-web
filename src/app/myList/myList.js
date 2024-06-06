'use client';
import { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { axiosInstance } from '@/lib/axiosInstance';

export default function MyList() {
  const [listFavorites, setListFavorites] = useState([]);

  const fetchListFavorites = async () => {
    try {
      const response = await axiosInstance.get('/favorite/list');
      setListFavorites(response.data);
    } catch (error) {
      console.error('Error getting favorites:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchListFavorites();
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
            MY LIST
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
          {listFavorites.map(item => (
            <Grid key={item.img} sx={{ width: 200, height: 400, margin: 1 }}>
              <img src={`${item.movie_id.image}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
