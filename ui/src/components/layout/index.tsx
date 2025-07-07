import {
  AppBar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(true);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };
  return (
    <Stack width="100%" height="100vh">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Support system
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-app-bar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-app-bar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Stack direction="row" flexGrow={1}>
        <Paper sx={{ width: openMenu ? 320 : 50, height: '100%' }}>
          <MenuList>
            <MenuItem onClick={() => handleNavigate('/contacts')}>
              <ListItemIcon>
                <ContactsIcon fontSize="medium" />
              </ListItemIcon>
              {openMenu && <ListItemText>Contacts</ListItemText>}
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <BookOnlineIcon fontSize="medium" />
              </ListItemIcon>
              {openMenu && <ListItemText>Tickets</ListItemText>}
            </MenuItem>

            <Divider />
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="medium" />
              </ListItemIcon>
              {openMenu && <ListItemText>Setting</ListItemText>}
            </MenuItem>
          </MenuList>
        </Paper>
        <Box flexGrow={1} height="100%" padding={4}>
          {children}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Layout;
