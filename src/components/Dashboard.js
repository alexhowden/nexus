import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const todoTasks = tasks.filter(t => t.status === 'todo').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;

  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueTodayTasks = tasks.filter(t => {
    if (!t.dueDate || t.status === 'done') return false;
    const dueDate = new Date(t.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  }).length;

  const overdueTasks = tasks.filter(t => {
    if (!t.dueDate || t.status === 'done') return false;
    const dueDate = new Date(t.dueDate);
    return dueDate < today;
  }).length;

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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

      <Paper
        className="cyber-card"
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: '#00ffff',
            fontFamily: '"Orbitron", sans-serif',
          }}
        >
          Task Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#00ffff',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                }}
              >
                {totalTasks}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: '"Share Tech Mono", monospace',
                }}
              >
                Total
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#ffaa00',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                }}
              >
                {inProgressTasks}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: '"Share Tech Mono", monospace',
                }}
              >
                In Progress
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#ff0040',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                }}
              >
                {highPriorityTasks}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: '"Share Tech Mono", monospace',
                }}
              >
                High Priority
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#00ff88',
                  fontFamily: '"Orbitron", sans-serif',
                  fontWeight: 700,
                }}
              >
                {completionRate.toFixed(0)}%
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: '"Share Tech Mono", monospace',
                }}
              >
                Complete
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {(dueTodayTasks > 0 || overdueTasks > 0) && (
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 0, 64, 0.2)' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: '"Rajdhani", sans-serif',
              }}
            >
              {dueTodayTasks > 0 && `${dueTodayTasks} due today`}
              {dueTodayTasks > 0 && overdueTasks > 0 && ' • '}
              {overdueTasks > 0 && (
                <span style={{ color: '#ff0040' }}>{overdueTasks} overdue</span>
              )}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
