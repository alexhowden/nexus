import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Settings = () => {
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
        SETTINGS
      </Typography>

      <Paper
        className="cyber-card"
        sx={{
          p: 4,
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
          System Configuration
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.8,
          }}
        >
          Configure your system settings and preferences here.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            // Coming soon: Settings interface
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
