import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import DescriptionIcon from '@mui/icons-material/Description';
import TimerIcon from '@mui/icons-material/Timer';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'todo', label: 'To-Do List', icon: <ChecklistIcon /> },
    { id: 'kanban', label: 'Kanban Board', icon: <ViewKanbanIcon /> },
    { id: 'notes', label: 'Notes', icon: <DescriptionIcon /> },
    { id: 'pomodoro', label: 'Pomodoro', icon: <TimerIcon /> },
    { id: 'agents', label: 'Agents', icon: <SmartToyIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'linear-gradient(180deg, rgba(15, 15, 15, 0.98) 0%, rgba(10, 10, 10, 0.99) 100%)',
        borderRight: '1px solid rgba(255, 0, 64, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '1px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent, #ff0040, transparent)',
          opacity: 0.5,
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255, 0, 64, 0.2)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '10%',
            width: '80%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #ff0040, transparent)',
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ff0040 0%, #ff3366 50%, #00ffff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: 'none',
            letterSpacing: '0.2em',
            textAlign: 'center',
            position: 'relative',
            '&::before': {
              content: '"NEXUS"',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow: '0 0 20px rgba(255, 0, 64, 0.8), 0 0 40px rgba(255, 0, 64, 0.4)',
              opacity: 0.5,
              zIndex: -1,
            },
          }}
        >
          NEXUS
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.3em',
            mt: 0.5,
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: '0.65rem',
          }}
        >
          AI AUTOMATION SYSTEM
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            sx={{
              cursor: 'pointer',
              mx: 2,
              mb: 1,
              borderRadius: 0,
              position: 'relative',
              background: activeTab === item.id
                ? 'linear-gradient(90deg, rgba(255, 0, 64, 0.2) 0%, transparent 100%)'
                : 'transparent',
              borderLeft: activeTab === item.id
                ? '3px solid #ff0040'
                : '3px solid transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(90deg, rgba(255, 0, 64, 0.1) 0%, transparent 100%)',
                borderLeft: '3px solid rgba(255, 0, 64, 0.5)',
              },
              '&::before': activeTab === item.id ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '100%',
                background: '#ff0040',
                boxShadow: '0 0 10px #ff0040, 0 0 20px rgba(255, 0, 64, 0.5)',
              } : {},
            }}
          >
            <ListItemIcon
              sx={{
                color: activeTab === item.id ? '#ff0040' : 'rgba(255, 255, 255, 0.5)',
                minWidth: 40,
                transition: 'all 0.3s ease',
                filter: activeTab === item.id ? 'drop-shadow(0 0 5px #ff0040)' : 'none',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: activeTab === item.id ? 600 : 400,
                  color: activeTab === item.id ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                },
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid rgba(255, 0, 64, 0.2)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.3)',
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
          }}
        >
          v1.0.0 // SYSTEM ONLINE
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mt: 1,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00ff88',
              boxShadow: '0 0 10px #00ff88',
              animation: 'pulse-glow 2s infinite',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: '#00ff88',
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: '0.6rem',
            }}
          >
            CONNECTED
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
