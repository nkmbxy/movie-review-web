'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { axiosInstance } from '@/lib/axiosInstance';

const menuNav = [
  { name: 'Home', path: '/' },
  { name: 'Movie', path: '/genre' },
  { name: 'My List', path: '/myList' },
  { name: 'Review', path: '/createReview' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElMovie, setAnchorElMovie] = useState(null);
  const [user, setUser] = useState(undefined);
  const [isLogin, setIsLogin] = useState(false);

  const fetchUserdata = async () => {
    try {
      const response = await axiosInstance.get('/user/userByUserID');
      const { data, status } = response;
      if (status === 200 && data?.message !== 'Unauthorized') {
        setUser(data);
      } else {
        setIsLogin(false);
        setUser(undefined);
      }
    } catch (error) {
      console.log(error.response?.status);
    }
  };

  useEffect(() => {
    fetchUserdata();
  }, []);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenMovieMenu = event => {
    setAnchorElMovie(event.currentTarget);
  };

  const handleCloseMovieMenu = () => {
    setAnchorElMovie(null);
  };

  useEffect(() => {
    setIsLogin(user !== undefined);
  }, [user]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/user/logout');
      setIsLogin(false);
      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography
              variant="body1"
              noWrap
              component={Link}
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: '#f3edce',
                textDecoration: 'none',
              }}
            >
              MOVIE
            </Typography>
            <Typography
              variant="body1"
              noWrap
              component={Link}
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: '#f3edce',
                textDecoration: 'none',
              }}
            >
              REVIEWS
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuNav.map(page => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Link href={page.path} passHref>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuNav.map(page => (
              <React.Fragment key={page.path}>
                {page.name === 'Movie' ? (
                  <>
                    <Button
                      component="div"
                      onClick={handleOpenMovieMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                    <Menu
                      id="menu-movie"
                      anchorEl={anchorElMovie}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElMovie)}
                      onClose={handleCloseMovieMenu}
                    >
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/action" passHref>
                          <Typography textAlign="center">Action</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/comedy" passHref>
                          <Typography textAlign="center">Comedy</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/drama" passHref>
                          <Typography textAlign="center">Drama</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/fantacy" passHref>
                          <Typography textAlign="center">Fantacy</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/investigation" passHref>
                          <Typography textAlign="center">Investigation</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/romance" passHref>
                          <Typography textAlign="center">Romance</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/sci-fi" passHref>
                          <Typography textAlign="center">Sci-fi</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMovieMenu}>
                        <Link href="/genre/thriller" passHref>
                          <Typography textAlign="center">Thriller</Typography>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    href={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Box>

          {isLogin != false ? (
            <Button
              sx={{
                padding: 1,
                color: '#FFFFFF',
              }}
              onClick={handleLogout}
            >
              <Typography
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Logout
              </Typography>
            </Button>
          ) : (
            <Button
              sx={{
                padding: 1,
                color: '#FFFFFF',
              }}
            >
              <Link href="/login" onClick={() => setActiveLink('')}>
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
