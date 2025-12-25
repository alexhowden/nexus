import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Notes = ({ notes, addNote, updateNote, deleteNote }) => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [viewingNote, setViewingNote] = useState(null);

  const handleAddNote = () => {
    if (newNoteTitle.trim()) {
      addNote({
        title: newNoteTitle,
        content: newNoteContent,
      });
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editingNote && editTitle.trim()) {
      updateNote(editingNote.id, {
        title: editTitle,
        content: editContent,
      });
      setEditingNote(null);
      setEditTitle('');
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditTitle('');
    setEditContent('');
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
        NOTES
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
          Create New Note
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Note title..."
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: '"Rajdhani", sans-serif',
              },
            }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Note content..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: '"Rajdhani", sans-serif',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddNote}
            startIcon={<AddIcon />}
            sx={{
              alignSelf: 'flex-start',
            }}
          >
            Add Note
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} md={6} lg={4} key={note.id}>
            <Paper
              className="cyber-card"
              sx={{
                p: 3,
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(255, 0, 64, 0.6)',
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => setViewingNote(note)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#00ffff',
                    fontFamily: '"Orbitron", sans-serif',
                    fontSize: '1rem',
                    flex: 1,
                  }}
                >
                  {note.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditNote(note)}
                    sx={{
                      color: '#00ffff',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => deleteNote(note.id)}
                    sx={{
                      color: '#ff0040',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 0, 64, 0.1)',
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: '"Rajdhani", sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: 'vertical',
                  flex: 1,
                }}
              >
                {note.content}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontFamily: '"Share Tech Mono", monospace',
                  mt: 2,
                }}
              >
                {new Date(note.updatedAt).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {notes.length === 0 && (
        <Paper
          className="cyber-card"
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            No notes yet. Create your first note above.
          </Typography>
        </Paper>
      )}

      <Dialog
        open={!!viewingNote}
        onClose={() => setViewingNote(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            border: '1px solid rgba(255, 0, 64, 0.3)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#00ffff', fontFamily: '"Orbitron", sans-serif' }}>
          {viewingNote?.title}
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: '#fff',
              fontFamily: '"Rajdhani", sans-serif',
              whiteSpace: 'pre-wrap',
              mt: 2,
            }}
          >
            {viewingNote?.content}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setViewingNote(null)} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!editingNote}
        onClose={handleCancelEdit}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            border: '1px solid rgba(255, 0, 64, 0.3)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#00ffff', fontFamily: '"Orbitron", sans-serif' }}>
          Edit Note
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
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
              rows={10}
              label="Content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: '"Rajdhani", sans-serif',
                },
              }}
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

export default Notes;
