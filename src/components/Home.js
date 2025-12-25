import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          mb: 3,
          fontFamily: '"Orbitron", sans-serif',
          background: 'linear-gradient(135deg, #ff0040 0%, #ff3366 50%, #00ffff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: 'none',
        }}
      >
        NEXUS
      </Typography>

      <Paper
        className="cyber-card"
        sx={{
          p: 4,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: '#00ffff',
            fontFamily: '"Orbitron", sans-serif',
          }}
        >
          AI Agent Automation Hub
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          Welcome to Nexus - your AI-powered automation platform for eliminating boring tasks.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#ff3366',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '0.9rem',
            mb: 1,
            mt: 2,
          }}
        >
          CORE FEATURES
        </Typography>
        <Box
          component="ul"
          sx={{
            pl: 3,
            color: 'rgba(255, 255, 255, 0.6)',
            '& li': {
              mb: 0.5,
              fontFamily: '"Rajdhani", sans-serif',
              fontSize: '1rem',
            },
          }}
        >
          <li>Gmail → Google Calendar event automation</li>
          <li>Task extraction and Google Tasks integration</li>
          <li>Unified to-do list with smart prioritization</li>
          <li>Email categorization and management</li>
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: '#ff3366',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '0.9rem',
            mb: 1,
            mt: 2,
          }}
        >
          PLANNED AUTOMATIONS
        </Typography>
        <Box
          component="ul"
          sx={{
            pl: 3,
            color: 'rgba(255, 255, 255, 0.6)',
            '& li': {
              mb: 0.5,
              fontFamily: '"Rajdhani", sans-serif',
              fontSize: '1rem',
            },
          }}
        >
          <li>Meeting assistant with auto-prep and notes</li>
          <li>Travel itinerary builder and tracking</li>
          <li>Bill payment reminders and tracking</li>
          <li>Contact management and follow-ups</li>
          <li>Document organization and filing</li>
          <li>Shopping lists and package tracking</li>
        </Box>
      </Paper>

      <Paper
        className="cyber-card"
        sx={{
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: '#ff0040',
            fontFamily: '"Orbitron", sans-serif',
          }}
        >
          System Status
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box className="status-indicator active" />
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            CORE SYSTEM: ONLINE
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box className="status-indicator pending" />
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            AI AGENTS: PENDING CONFIGURATION
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box className="status-indicator pending" />
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            AUTOMATION MODULES: PENDING DEVELOPMENT
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
