import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const PomodoroTimer = () => {
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
        POMODORO TIMER
      </Typography>

      <Paper
        className="cyber-card"
        sx={{
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 3,
            color: '#00ffff',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '5rem',
          }}
        >
          25:00
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: '"Rajdhani", sans-serif',
          }}
        >
          Focus Session
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            // Coming soon: Pomodoro timer functionality
            <br />
            // Features: 25min work / 5min break cycles
            <br />
            // Track completed sessions, productivity stats
          </Typography>
        </Box>
      </Paper>

      <Paper
        className="cyber-card"
        sx={{
          p: 3,
          mt: 3,
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
          Session Statistics
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: '"Share Tech Mono", monospace',
          }}
        >
          // Today: 0 sessions completed
          <br />
          // This week: 0 sessions completed
          <br />
          // Total focus time: 0h 0m
        </Typography>
      </Paper>
    </Box>
  );
};

export default PomodoroTimer;
