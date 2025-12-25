import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Settings = () => {
  const [confirmDialog, setConfirmDialog] = useState(null);

  const handleExportData = () => {
    const data = {
      tasks: JSON.parse(localStorage.getItem('nexus-tasks') || '[]'),
      notes: JSON.parse(localStorage.getItem('nexus-notes') || '[]'),
      pomodoroTotal: localStorage.getItem('nexus-pomodoro-total') || '0',
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.tasks) localStorage.setItem('nexus-tasks', JSON.stringify(data.tasks));
            if (data.notes) localStorage.setItem('nexus-notes', JSON.stringify(data.notes));
            if (data.pomodoroTotal) localStorage.setItem('nexus-pomodoro-total', data.pomodoroTotal);
            window.location.reload();
          } catch (error) {
            alert('Error importing data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAllData = () => {
    setConfirmDialog('clearAll');
  };

  const handleClearTasks = () => {
    setConfirmDialog('clearTasks');
  };

  const handleClearNotes = () => {
    setConfirmDialog('clearNotes');
  };

  const handleClearPomodoro = () => {
    setConfirmDialog('clearPomodoro');
  };

  const confirmClear = () => {
    switch (confirmDialog) {
      case 'clearAll':
        localStorage.clear();
        break;
      case 'clearTasks':
        localStorage.removeItem('nexus-tasks');
        break;
      case 'clearNotes':
        localStorage.removeItem('nexus-notes');
        break;
      case 'clearPomodoro':
        localStorage.removeItem('nexus-pomodoro-total');
        localStorage.removeItem('nexus-pomodoro-today');
        localStorage.removeItem('nexus-pomodoro-state');
        break;
      default:
        break;
    }
    setConfirmDialog(null);
    window.location.reload();
  };

  const getStorageSize = () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return (total / 1024).toFixed(2);
  };

  const taskCount = JSON.parse(localStorage.getItem('nexus-tasks') || '[]').length;
  const noteCount = JSON.parse(localStorage.getItem('nexus-notes') || '[]').length;
  const pomodoroTotal = localStorage.getItem('nexus-pomodoro-total') || '0';

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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
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
              Data Management
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportData}
                sx={{
                  borderColor: '#00ffff',
                  color: '#00ffff',
                  '&:hover': {
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  },
                }}
              >
                Export All Data
              </Button>

              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={handleImportData}
                sx={{
                  borderColor: '#ffaa00',
                  color: '#ffaa00',
                  '&:hover': {
                    borderColor: '#ffcc00',
                    backgroundColor: 'rgba(255, 170, 0, 0.1)',
                  },
                }}
              >
                Import Data
              </Button>
            </Box>

            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 0, 64, 0.2)' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: '"Share Tech Mono", monospace',
                  mb: 1,
                }}
              >
                Storage: {getStorageSize()} KB
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: '"Share Tech Mono", monospace',
                }}
              >
                {taskCount} tasks • {noteCount} notes • {pomodoroTotal} sessions
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: '#ff0040',
                fontFamily: '"Orbitron", sans-serif',
              }}
            >
              Clear Data
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleClearTasks}
                sx={{
                  borderColor: 'rgba(255, 0, 64, 0.5)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    borderColor: '#ff0040',
                    backgroundColor: 'rgba(255, 0, 64, 0.1)',
                  },
                }}
              >
                Clear Tasks ({taskCount})
              </Button>

              <Button
                variant="outlined"
                onClick={handleClearNotes}
                sx={{
                  borderColor: 'rgba(255, 0, 64, 0.5)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    borderColor: '#ff0040',
                    backgroundColor: 'rgba(255, 0, 64, 0.1)',
                  },
                }}
              >
                Clear Notes ({noteCount})
              </Button>

              <Button
                variant="outlined"
                onClick={handleClearPomodoro}
                sx={{
                  borderColor: 'rgba(255, 0, 64, 0.5)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    borderColor: '#ff0040',
                    backgroundColor: 'rgba(255, 0, 64, 0.1)',
                  },
                }}
              >
                Clear Pomodoro Stats
              </Button>

              <Button
                variant="contained"
                startIcon={<DeleteForeverIcon />}
                onClick={handleClearAllData}
                sx={{
                  mt: 2,
                  backgroundColor: 'rgba(255, 0, 64, 0.2)',
                  color: '#ff0040',
                  border: '1px solid #ff0040',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 64, 0.3)',
                  },
                }}
              >
                Clear All Data
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            className="cyber-card"
            sx={{
              p: 3,
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
              About Nexus
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: '"Rajdhani", sans-serif',
                mb: 1,
              }}
            >
              Version 1.0.0
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: '"Share Tech Mono", monospace',
              }}
            >
              AI-powered task management and productivity system
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={!!confirmDialog}
        onClose={() => setConfirmDialog(null)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            border: '1px solid rgba(255, 0, 64, 0.3)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#ff0040', fontFamily: '"Orbitron", sans-serif' }}>
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#fff', fontFamily: '"Rajdhani", sans-serif' }}>
            Are you sure you want to {confirmDialog === 'clearAll' ? 'clear all data' : `clear ${confirmDialog?.replace('clear', '').toLowerCase()}`}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmDialog(null)} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Cancel
          </Button>
          <Button onClick={confirmClear} variant="contained" sx={{ backgroundColor: '#ff0040' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
