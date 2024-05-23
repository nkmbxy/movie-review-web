'use client';
import { useCallback, useState } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { loginAPI } from '../../api/user';
import AlertDialogError from '../../components/alertDialog/alertError';
import { useRouter } from 'next/navigation';
import { useSetRecoilState, authState } from '../../store';
import ToastSuccess from '../../components/toast';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [messageDialogError, setMessageDialogError] = useState('');
  const [titleDialogError, setTitleDialogError] = useState('');
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const setAuth = useSetRecoilState(authState);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        const response = await loginAPI(formData.email, formData.password);
        if (response?.status === 200) {
          localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
          setAuth(response.headers['x-auth-token']);
          setOpenToast(true);
          router.push('/');
        } else {
          throw new Error('Login failed with status: ' + response?.status);
        }
      } catch (err) {
        console.error('Error login:', err);
        setOpenAlertDialogError(true);
        setMessageDialogError('Failed to login');
        setTitleDialogError('Error');
      }
    },
    [formData, router, setAuth]
  );

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
          <ToastSuccess
            openToast={openToast}
            handleCloseToast={handleCloseToast}
            text="Login successfully"
            showClose={true}
          />

          <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
        </Grid>
      </Grid>
    </form>
  );
}
