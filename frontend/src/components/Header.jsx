import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, styled, Box, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AppLogo from '../Images/Blog_App_Logo.png';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        <StyledListItem button>
          <StyledLink to={'/home'}><ListItemText primary="Home" /></StyledLink>
        </StyledListItem>
        <StyledListItem button>
          <StyledLink to={'/blog/create'}><ListItemText primary="Create blog" /></StyledLink>
        </StyledListItem>
        <StyledListItem button>
          <StyledLink to={'/user/blog'}><ListItemText primary="Your Blogs" /></StyledLink>
        </StyledListItem>
        <StyledListItem button>
          <StyledLink to={'/signin'}><ListItemText primary="Logout" /></StyledLink>
        </StyledListItem>
      </List>
    </Box>
  );

  return (
    <Component position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LogoContainer>
            <Image src={AppLogo} alt='App Logo' />
          </LogoContainer>
          <NavLinks>
            <StyledLink to={'/home'}><NavItem variant="h6">Home</NavItem></StyledLink>
            <StyledLink to={'/blog/create'}><NavItem variant="h6">Create Blog</NavItem></StyledLink>
            <StyledLink to={'/user/blog'}><NavItem variant="h6">Your Blogs</NavItem></StyledLink>
            <StyledLink to={'/signin'}><NavItem variant="h6">Logout</NavItem></StyledLink>
          </NavLinks>
          <MobileMenuIcon>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </MobileMenuIcon>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawerContent}
      </Drawer>
    </Component>
  );
}

const Component = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;

const LogoContainer = styled(Box)`
  flex-grow: 1;
`;

const NavLinks = styled(Box)`
  display: flex;
  gap: 40px;
  & > a {
    color : inherit;
    text-decoration : none;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileMenuIcon = styled(Box)`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    cursor: pointer;
  &:hover {
    color: #007BFF;
  }
  }
`;

const NavItem = styled(Typography)`
  cursor: pointer;
  &:hover {
    color: #007BFF;
  }
`;

const Image = styled('img')({
  width: 120,
  height: 50,
});

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const StyledListItem = styled(ListItem)`
  & a {
    color: inherit;
    text-decoration: none;
  }
`;