import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, IconButton, Checkbox, FormControl, InputLabel, Select, MenuItem, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoList = ({ tasks, addTask, updateTask, deleteTask, toggleTaskComplete }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editDueDate, setEditDueDate] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate ? new Date(task.dueDate) : null);
  };

  const handleSaveEdit = () => {
    if (editingTask && editTitle.trim()) {
      updateTask(editingTask.id, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        dueDate: editDueDate ? editDueDate.toISOString().split('T')[0] : null,
      });
      setEditingTask(null);
      setEditTitle('');
      setEditDescription('');
      setEditPriority('medium');
      setEditDueDate(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditDescription('');
    setEditPriority('medium');
    setEditDueDate(null);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        status: 'todo',
        dueDate: newTaskDueDate ? newTaskDueDate.toISOString().split('T')[0] : null,
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('medium');
      setNewTaskDueDate(null);
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
          overflow: 'visible',
          position: 'relative',
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'visible', position: 'relative', zIndex: 1 }}>
          <TextField
            fullWidth
            placeholder="Enter task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: '"Rajdhani", sans-serif',
              },
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Enter task description (optional)..."
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: '"Rajdhani", sans-serif',
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
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
          <Box sx={{ minWidth: 150 }}>
            <DatePicker
              selected={newTaskDueDate}
              onChange={(date) => setNewTaskDueDate(date)}
              placeholderText="Due Date"
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              customInput={
                <TextField
                  fullWidth
                  label="Due Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              }
            />
          </Box>
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
          <FormControl sx={{ minWidth: 150, '& .MuiInputLabel-root': { zIndex: 0 } }}>
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
                  {task.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: '"Rajdhani", sans-serif',
                        fontSize: '0.9rem',
                        mt: 0.5,
                      }}
                    >
                      {task.description}
                    </Typography>
                  )}
                  {task.dueDate && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: '0.85rem',
                        mt: 0.5,
                      }}
                    >
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                  )}
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
                  onClick={() => handleEditTask(task)}
                  sx={{
                    color: '#00ffff',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 255, 255, 0.1)',
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
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

      <Dialog
        open={!!editingTask}
        onClose={handleCancelEdit}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            border: '1px solid rgba(255, 0, 64, 0.3)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#00ffff', fontFamily: '"Orbitron", sans-serif' }}>
          Edit Task
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, minWidth: 400 }}>
            <TextField
              fullWidth
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: '"Rajdhani", sans-serif',
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: '"Rajdhani", sans-serif',
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={editPriority}
                label="Priority"
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              selected={editDueDate}
              onChange={(date) => setEditDueDate(date)}
              placeholderText="Due Date"
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              customInput={
                <TextField
                  fullWidth
                  label="Due Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCancelEdit} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoList;
