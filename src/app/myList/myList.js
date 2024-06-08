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
  }, []);

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
            MY LIST
          </Typography>

          <Grid container sx={{ width: '100%', padding: 2 }}>
            <Grid
              container
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'start',
              }}
            >
              {listFavorites.map((item, index) => (
                <Grid key={index} sx={{ margin: 1 }}>
                  {item.movie_id && item.movie_id.image && (
                    <img
                      src={`${item.movie_id.image}`}
                      style={{
                        width: '280px',
                        height: '180px',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
