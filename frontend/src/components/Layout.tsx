'use client';

import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import {
  Dashboard as DashboardIcon,
  Folder as ProjectIcon,
  Description as DocumentIcon,
  VideoCall as MeetingIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 280;

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard',
    badge: null
  },
  { 
    text: 'Projects', 
    icon: <ProjectIcon />, 
    path: '/projects',
    badge: null
  },
  { 
    text: 'Documents', 
    icon: <DocumentIcon />, 
    path: '/documents',
    badge: '3'
  },
  { 
    text: 'Meetings', 
    icon: <MeetingIcon />, 
    path: '/meetings',
    badge: '1'
  },
  { 
    text: 'AI Chat', 
    icon: <ChatIcon />, 
    path: '/chat',
    badge: null
  },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />, 
    path: '/settings',
    badge: null
  },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleProfileMenuClose();
    await logout();
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid #334155',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              R
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ReqGather
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 6 }}>
          Requirements Platform
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, p: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => {
                router.push(item.path);
                setMobileOpen(false);
              }}
              selected={pathname === item.path}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0.15) 100%)',
                  }
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
                  transform: 'translateX(4px)',
                }
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: pathname === item.path ? '#6366f1' : 'text.secondary'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontWeight: pathname === item.path ? 600 : 500,
                    color: pathname === item.path ? '#6366f1' : 'text.primary'
                  }
                }}
              />
              {item.badge && (
                <Badge 
                  badgeContent={item.badge} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ p: 2, borderTop: '1px solid #334155' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => router.push('/projects/new')}
          sx={{ 
            mb: 2,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
            }
          }}
        >
          New Project
        </Button>
      </Box>
    </Box>
  );

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Toaster position="top-right" />
      
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #334155',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ px: 3 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Requirements Gathering Platform
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search */}
            <Tooltip title="Search">
              <IconButton color="inherit" size="large">
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" size="large">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#334155' }} />

            {/* User Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  border: '2px solid rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    borderColor: '#6366f1',
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 36, 
                  height: 36,
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </Avatar>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        id="profile-menu"
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
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            border: '1px solid #334155',
            borderRadius: 2,
            mt: 1,
            minWidth: 200,
          }
        }}
      >
        <MenuItem onClick={() => { handleProfileMenuClose(); router.push('/profile'); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => { handleProfileMenuClose(); router.push('/settings'); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider sx={{ borderColor: '#334155' }} />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
              borderRight: '1px solid #334155',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
              borderRight: '1px solid #334155',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
