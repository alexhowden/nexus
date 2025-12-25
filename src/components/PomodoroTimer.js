import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Button, IconButton, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const PomodoroTimer = () => {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;
  const LONG_BREAK_TIME = 15 * 60;

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('nexus-pomodoro-state');
    if (saved) {
      const state = JSON.parse(saved);
      const elapsed = Math.floor((Date.now() - state.lastUpdate) / 1000);
      if (state.isRunning && elapsed < state.timeLeft) {
        return state.timeLeft - elapsed;
      }
      return state.timeLeft;
    }
    return WORK_TIME;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem('nexus-pomodoro-state');
    if (saved) {
      const state = JSON.parse(saved);
      const elapsed = Math.floor((Date.now() - state.lastUpdate) / 1000);
      return state.isRunning && elapsed < state.timeLeft;
    }
    return false;
  });
  const [isBreak, setIsBreak] = useState(() => {
    const saved = localStorage.getItem('nexus-pomodoro-state');
    return saved ? JSON.parse(saved).isBreak : false;
  });
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    const saved = localStorage.getItem('nexus-pomodoro-state');
    return saved ? JSON.parse(saved).sessionsCompleted : 0;
  });
  const [todaySessions, setTodaySessions] = useState(() => {
    const saved = localStorage.getItem('nexus-pomodoro-today');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      if (data.date === today) {
        return data.count;
      }
    }
    return 0;
  });
  const [totalSessions, setTotalSessions] = useState(() => {
    const saved = localStorage.getItem('nexus-pomodoro-total');
    return saved ? parseInt(saved) : 0;
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('nexus-pomodoro-state', JSON.stringify({
      timeLeft,
      isRunning,
      isBreak,
      sessionsCompleted,
      lastUpdate: Date.now()
    }));
  }, [timeLeft, isRunning, isBreak, sessionsCompleted]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('nexus-pomodoro-today', JSON.stringify({
      date: today,
      count: todaySessions
    }));
  }, [todaySessions]);

  useEffect(() => {
    localStorage.setItem('nexus-pomodoro-total', totalSessions.toString());
  }, [totalSessions]);

  const handleTimerComplete = () => {
    setIsRunning(false);

    if (!isBreak) {
      const newSessionCount = sessionsCompleted + 1;
      setSessionsCompleted(newSessionCount);
      setTodaySessions(prev => prev + 1);
      setTotalSessions(prev => prev + 1);

      if (newSessionCount % 4 === 0) {
        setTimeLeft(LONG_BREAK_TIME);
      } else {
        setTimeLeft(BREAK_TIME);
      }
      setIsBreak(true);
    } else {
      setTimeLeft(WORK_TIME);
      setIsBreak(false);
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: isBreak ? 'Break complete! Time to focus.' : 'Session complete! Take a break.',
      });
    }
  };

  const handleStartPause = () => {
    if (!isRunning && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? (sessionsCompleted % 4 === 0 ? LONG_BREAK_TIME : BREAK_TIME) : WORK_TIME);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (isBreak) {
      setTimeLeft(WORK_TIME);
      setIsBreak(false);
    } else {
      const newSessionCount = sessionsCompleted + 1;
      setSessionsCompleted(newSessionCount);
      setTodaySessions(prev => prev + 1);
      setTotalSessions(prev => prev + 1);

      if (newSessionCount % 4 === 0) {
        setTimeLeft(LONG_BREAK_TIME);
      } else {
        setTimeLeft(BREAK_TIME);
      }
      setIsBreak(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionType = () => {
    if (isBreak) {
      return sessionsCompleted % 4 === 0 ? 'Long Break' : 'Short Break';
    }
    return 'Focus Session';
  };

  const getTimerColor = () => {
    if (isBreak) {
      return sessionsCompleted % 4 === 0 ? '#00ff88' : '#00ffff';
    }
    return '#ff0040';
  };

  const totalFocusMinutes = totalSessions * 25;
  const totalHours = Math.floor(totalFocusMinutes / 60);
  const totalMinutes = totalFocusMinutes % 60;

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
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: getTimerColor(),
            fontFamily: '"Orbitron", sans-serif',
          }}
        >
          {getSessionType()}
        </Typography>

        <Typography
          variant="h1"
          sx={{
            mb: 3,
            color: getTimerColor(),
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '6rem',
            fontWeight: 700,
            textShadow: `0 0 20px ${getTimerColor()}`,
          }}
        >
          {formatTime(timeLeft)}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
          <IconButton
            onClick={handleStartPause}
            sx={{
              width: 80,
              height: 80,
              backgroundColor: isRunning ? 'rgba(255, 170, 0, 0.2)' : 'rgba(0, 255, 136, 0.2)',
              border: `2px solid ${isRunning ? '#ffaa00' : '#00ff88'}`,
              color: isRunning ? '#ffaa00' : '#00ff88',
              '&:hover': {
                backgroundColor: isRunning ? 'rgba(255, 170, 0, 0.3)' : 'rgba(0, 255, 136, 0.3)',
              },
            }}
          >
            {isRunning ? <PauseIcon sx={{ fontSize: 40 }} /> : <PlayArrowIcon sx={{ fontSize: 40 }} />}
          </IconButton>
          <IconButton
            onClick={handleReset}
            sx={{
              width: 80,
              height: 80,
              backgroundColor: 'rgba(255, 0, 64, 0.2)',
              border: '2px solid #ff0040',
              color: '#ff0040',
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 64, 0.3)',
              },
            }}
          >
            <RestartAltIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        <Button
          onClick={handleSkip}
          variant="outlined"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Skip {isBreak ? 'Break' : 'Session'}
        </Button>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {[...Array(4)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: i < (sessionsCompleted % 4) ? '#ff0040' : 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 0, 64, 0.5)',
              }}
            />
          ))}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#00ffff',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
              }}
            >
              {todaySessions}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              Today
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#ff0040',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
              }}
            >
              {sessionsCompleted}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              This Session
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#00ff88',
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
              }}
            >
              {totalHours}h {totalMinutes}m
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              Total Focus Time
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PomodoroTimer;
