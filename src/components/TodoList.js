import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, IconButton, Checkbox, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const TodoList = ({ tasks, addTask, updateTask, deleteTask, toggleTaskComplete }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        priority: newTaskPriority,
        status: 'todo',
      });
      setNewTaskTitle('');
      setNewTaskPriority('medium');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff0040';
      case 'medium': return '#ffaa00';
      case 'low': return '#00ffff';
      default: return '#fff';
    }
  };
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
        TO-DO LIST
      </Typography>

      <Paper
        className="cyber-card"
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: '#00ffff',
            fontFamily: '"Orbitron", sans-serif',
          }}
        >
          Add New Task
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <TextField
            fullWidth
            placeholder="Enter task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: '"Rajdhani", sans-serif',
              },
            }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={newTaskPriority}
              label="Priority"
              onChange={(e) => setNewTaskPriority(e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleAddTask}
            startIcon={<AddIcon />}
            sx={{
              minWidth: 120,
              height: 56,
            }}
          >
            Add
          </Button>
        </Box>
      </Paper>

      <Paper
        className="cyber-card"
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterStatus}
              label="Filter by Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Priority</InputLabel>
            <Select
              value={filterPriority}
              label="Filter by Priority"
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flex: 1 }} />
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '"Share Tech Mono", monospace',
              alignSelf: 'center',
            }}
          >
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {filteredTasks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: '"Rajdhani", sans-serif',
              }}
            >
              No tasks found. Add your first task above!
            </Typography>
          </Box>
        ) : (
          <Box>
            {filteredTasks.map((task) => (
              <Paper
                key={task.id}
                sx={{
                  p: 2,
                  mb: 2,
                  background: 'rgba(20, 20, 20, 0.5)',
                  border: '1px solid rgba(255, 0, 64, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'rgba(255, 0, 64, 0.5)',
                    background: 'rgba(30, 30, 30, 0.5)',
                  },
                }}
              >
                <Checkbox
                  checked={task.status === 'done'}
                  onChange={() => toggleTaskComplete(task.id)}
                  sx={{
                    color: '#00ffff',
                    '&.Mui-checked': {
                      color: '#00ff88',
                    },
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: task.status === 'done' ? 'rgba(255, 255, 255, 0.5)' : '#fff',
                      textDecoration: task.status === 'done' ? 'line-through' : 'none',
                      fontFamily: '"Rajdhani", sans-serif',
                      fontSize: '1.1rem',
                    }}
                  >
                    {task.title}
                  </Typography>
                </Box>
                <Chip
                  label={task.priority.toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: getPriorityColor(task.priority),
                    color: '#000',
                    fontWeight: 600,
                    fontFamily: '"Rajdhani", sans-serif',
                  }}
                />
                <Chip
                  label={task.status.replace('_', ' ').toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: '0.7rem',
                  }}
                />
                <IconButton
                  onClick={() => deleteTask(task.id)}
                  sx={{
                    color: '#ff0040',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 64, 0.1)',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TodoList;
