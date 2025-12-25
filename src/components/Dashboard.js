import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const Dashboard = () => {
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
        DASHBOARD
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
              height: '300px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: '#00ffff',
                fontFamily: '"Orbitron", sans-serif',
              }}
            >
              Gmail Overview
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              // Gmail integration widget placeholder
              <br />
              // Will show: unread count, important emails, recent activity
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
              height: '300px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: '#00ffff',
                fontFamily: '"Orbitron", sans-serif',
              }}
            >
              Google Calendar
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              // Calendar widget placeholder
              <br />
              // Will show: today's events, upcoming meetings, conflicts
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
              height: '300px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: '#00ffff',
                fontFamily: '"Orbitron", sans-serif',
              }}
            >
              Tasks Overview
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              // Tasks summary placeholder
              <br />
              // Will show: tasks due today, overdue, completed count
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
              height: '300px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: '#00ffff',
                fontFamily: '"Orbitron", sans-serif',
              }}
            >
              Quick Actions
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              // Quick actions placeholder
              <br />
              // Will show: add task, create event, start timer
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
