import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0040',
      light: '#ff3366',
      dark: '#cc0033',
    },
    secondary: {
      main: '#00ffff',
      light: '#66ffff',
      dark: '#00cccc',
    },
    background: {
      default: '#0a0a0a',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    error: {
      main: '#ff0040',
    },
    warning: {
      main: '#ffaa00',
    },
    success: {
      main: '#00ff88',
    },
  },
  typography: {
    fontFamily: '"Rajdhani", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
    body1: {
      fontFamily: '"Rajdhani", sans-serif',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: '"Rajdhani", sans-serif',
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          boxShadow: '0 0 10px rgba(255, 0, 64, 0.5)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(255, 0, 64, 0.8)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255, 0, 64, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 0, 64, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 0, 64, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff0040',
            },
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
