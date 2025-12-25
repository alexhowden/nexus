import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import KanbanBoard from './components/KanbanBoard';
import PomodoroTimer from './components/PomodoroTimer';
import Agents from './components/Agents';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('nexus-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: Date.now(),
      completedAt: null,
      order: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const isCompleting = task.status !== 'done';
        return {
          ...task,
          status: isCompleting ? 'done' : 'todo',
          completedAt: isCompleting ? Date.now() : null,
        };
      }
      return task;
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard tasks={tasks} />;
      case 'todo':
        return <TodoList
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          toggleTaskComplete={toggleTaskComplete}
        />;
      case 'kanban':
        return <KanbanBoard
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />;
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'agents':
        return <Agents />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard tasks={tasks} />;
    }
  };

  return (
    <Box className="app-container">
      <Box className="scanline" />
      <Box className="noise" />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box className="main-content">
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;
