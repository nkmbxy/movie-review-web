import React from 'react';
import { Grid } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

function MyLoader() {
  return (
    <Grid
      container
      className="sweet-loading"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000000',
      }}
    >
      <ClipLoader color="#9b9b9b" loading={true} size={160} />
    </Grid>
  );
}

export default MyLoader;
