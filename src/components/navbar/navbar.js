"use client";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Divider from '@mui/material/Divider';

const menuNav = [
  { name: "Home", path: "/" },
  { name: "Movie", path: "/movie" },
  { name: "My List", path: "/myList" },
  { name: "Review", path: "/createReview" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0a0a0a" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography
              variant="body1"
              noWrap
              component={Link}
              href="#"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#f3edce",
                textDecoration: "none",
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
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#f3edce",
                textDecoration: "none",
              }}
            >
              REVIEWS
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuNav.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Link href={page.path} passHref>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuNav.map((page) => (
              <Button
                key={page.path}
                component={Link}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Button
            sx={{
              padding: 1,
              color: "#FFFFFF",
            }}
          >
            <Link href="/login" onClick={() => setActiveLink("")}>
              Login
            </Link>
          </Button>
          <Divider 
            orientation="vertical" variant="middle" 
            sx={{
              height: 20,
              borderColor: '#FFFFFF',
            }}
          />
          <Button
            sx={{
              padding: 1,
              color: "#FFFFFF",
            }}
          >
            <Typography
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
