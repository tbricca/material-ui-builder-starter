import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Description as FormIcon,
  TableChart as TableIcon,
  ViewModule as LayoutIcon,
  Code as CodeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const navigationItems = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { path: '/examples/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/examples/forms', label: 'Forms', icon: <FormIcon /> },
  { path: '/examples/tables', label: 'Tables', icon: <TableIcon /> },
  { path: '/examples/layouts', label: 'Layouts', icon: <LayoutIcon /> },
];

export default function ExampleNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              Fusion Starter
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    bgcolor: isActive(item.path) ? 'primary.50' : 'transparent',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleMenuClose}
              >
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.icon}
                      {item.label}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* CRM Link */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate('/crm')}
            sx={{ ml: 2 }}
          >
            Full CRM Demo
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
