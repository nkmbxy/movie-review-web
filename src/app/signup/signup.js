'use client';
import { useState, useCallback } from 'react';
import { signupAPI } from '../../api/user';
import { Grid, Typography } from '@mui/material';
import { useSetRecoilState, authState } from '../../store';
import AlertDialogError from '../../components/alertDialog/alertError';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [messageDialogError, setMessageDialogError] = useState('');
  const [titleDialogError, setTitleDialogError] = useState('');
  const setAuth = useSetRecoilState(authState);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleSubmit = useCallback(async e => {
    try {
      e.preventDefault();
      const response = await signupAPI(e.target[0].value, e.target[1].value, e.target[2].value);
      localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
      setAuth(response.headers['x-auth-token']);
      router.push('/');
    } catch (err) {
      console.error('Error signup :', err);
      setOpenAlertDialogError(true);
      setMessageDialogError('Failed to signup');
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
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '20px',
            }}
          />

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
            }}
          >
            Confirm
          </button>
        </Grid>
      </Grid>
    </form>
  );
}
