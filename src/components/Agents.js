import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Agents = () => {
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
        AI AGENTS
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
          Agent Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.8,
          }}
        >
          Configure and manage your AI automation agents here.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            // Coming soon: Agent configuration interface
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Agents;
