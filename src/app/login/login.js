'use client';
import { useCallback, useState } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { loginAPI } from '../../api/user';
import AlertDialogError from '../../components/alertDialog/alertError';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [messageDialogError, setMessageDialogError] = useState('');
  const [titleDialogError, setTitleDialogError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleSubmit = useCallback(async e => {
    try {
      e.preventDefault();
      const response = await loginAPI(e.target[0].value, e.target[1].value);
      console.log(response.headers['x-auth-token']);
    } catch (err) {
      console.error('Error logging in:', err);
      setOpenAlertDialogError(true);
      setMessageDialogError('Failed to login');
      setTitleDialogError('Error');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <AlertDialogError
        openAlertDialog={openAlertDialogError}
        handleOnCloseDialog={handleOnCloseDialog}
        message={messageDialogError}
        title={titleDialogError}
      />
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '91.5vh',
          backgroundColor: '#000000',
        }}
      >
        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '350px',
            backgroundColor: '#444',
            padding: '40px',
            borderRadius: '15px',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h4" sx={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
            Movie Reviews
          </Typography>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '20px',
            }}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '20px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: 'grey',
              color: 'white',
              border: 'none',
              backgroundColor: '#000000',
              borderRadius: '20px',
              marginBottom: '15px',
            }}
          >
            Login
          </button>
          <Link
            href="signup"
            underline="hover"
            style={{
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '13px',
            }}
          >
            Sign up
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
