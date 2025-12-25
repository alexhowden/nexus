import React from 'react';
import { Box, Typography, Paper, Grid, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, deleteTask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff0040';
      case 'medium': return '#ffaa00';
      case 'low': return '#00ffff';
      default: return '#fff';
    }
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 2,
        mb: 2,
        background: 'rgba(20, 20, 20, 0.8)',
        border: '1px solid rgba(255, 0, 64, 0.3)',
        cursor: 'grab',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(255, 0, 64, 0.6)',
          background: 'rgba(30, 30, 30, 0.8)',
          transform: 'translateY(-2px)',
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              fontFamily: '"Rajdhani", sans-serif',
              fontSize: '1rem',
              fontWeight: 500,
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
                fontSize: '0.85rem',
                mt: 0.5,
              }}
            >
              {task.description}
            </Typography>
          )}
        </Box>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          sx={{
            color: '#ff0040',
            ml: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 64, 0.1)',
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Chip
          label={task.priority.toUpperCase()}
          size="small"
          sx={{
            backgroundColor: getPriorityColor(task.priority),
            color: '#000',
            fontWeight: 600,
            fontFamily: '"Rajdhani", sans-serif',
            fontSize: '0.7rem',
          }}
        />
        {task.dueDate && (
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: '0.7rem',
            }}
          >
            {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

const KanbanColumn = ({ title, color, status, tasks, deleteTask }) => {
  const columnTasks = tasks
    .filter(task => task.status === status)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Paper
      className="cyber-card"
      sx={{
        p: 2,
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: color,
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '0.9rem',
          }}
        >
          {title}
        </Typography>
        <Chip
          label={columnTasks.length}
          size="small"
          sx={{
            backgroundColor: color,
            color: '#000',
            fontWeight: 700,
            fontFamily: '"Share Tech Mono", monospace',
          }}
        />
      </Box>
      <SortableContext items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <Box ref={setNodeRef} sx={{ flex: 1, minHeight: '400px' }}>
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
          ))}
          {columnTasks.length === 0 && (
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.3)',
                fontFamily: '"Share Tech Mono", monospace',
                textAlign: 'center',
                mt: 4,
              }}
            >
              Drop tasks here
            </Typography>
          )}
        </Box>
      </SortableContext>
    </Paper>
  );
};

const KanbanBoard = ({ tasks, updateTask, deleteTask }) => {
  const [activeId, setActiveId] = React.useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    // Check if dropped on a column (status string)
    if (typeof over.id === 'string' && ['todo', 'in_progress', 'review', 'done'].includes(over.id)) {
      if (activeTask.status !== over.id) {
        updateTask(activeTask.id, { status: over.id, order: Date.now() });
      }
      return;
    }

    // Check if dropped on another task
    const overTask = tasks.find(t => t.id === over.id);
    if (!overTask) return;

    // If moving to different column
    if (activeTask.status !== overTask.status) {
      updateTask(activeTask.id, { status: overTask.status, order: overTask.order - 0.5 });
    } else {
      // Same column - reorder by adjusting order values
      const columnTasks = tasks
        .filter(t => t.status === activeTask.status)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const activeIndex = columnTasks.findIndex(t => t.id === active.id);
      const overIndex = columnTasks.findIndex(t => t.id === over.id);

      if (activeIndex !== overIndex) {
        // Calculate new order value between adjacent tasks
        let newOrder;
        if (overIndex === 0) {
          newOrder = (columnTasks[0].order || 0) - 1;
        } else if (overIndex === columnTasks.length - 1) {
          newOrder = (columnTasks[columnTasks.length - 1].order || 0) + 1;
        } else {
          const prevOrder = columnTasks[overIndex - (overIndex > activeIndex ? 0 : 1)].order || 0;
          const nextOrder = columnTasks[overIndex + (overIndex > activeIndex ? 1 : 0)].order || 0;
          newOrder = (prevOrder + nextOrder) / 2;
        }
        updateTask(activeTask.id, { order: newOrder });
      }
    }
  };

  const columns = [
    { id: 'todo', title: 'TO DO', color: '#ff0040', status: 'todo' },
    { id: 'in_progress', title: 'IN PROGRESS', color: '#ffaa00', status: 'in_progress' },
    { id: 'review', title: 'REVIEW', color: '#00ffff', status: 'review' },
    { id: 'done', title: 'DONE', color: '#00ff88', status: 'done' },
  ];

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
        KANBAN BOARD
      </Typography>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Grid container spacing={2}>
          {columns.map((column) => (
            <Grid item xs={12} md={3} key={column.id}>
              <KanbanColumn
                title={column.title}
                color={column.color}
                status={column.status}
                tasks={tasks}
                deleteTask={deleteTask}
              />
            </Grid>
          ))}
        </Grid>
        <DragOverlay dropAnimation={null}>
          {activeId && tasks.find(t => t.id === activeId) ? (
            <Paper
              sx={{
                p: 2,
                width: '250px',
                background: 'rgba(20, 20, 20, 0.8)',
                border: '1px solid rgba(255, 0, 64, 0.3)',
                cursor: 'grabbing',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#fff',
                    fontFamily: '"Rajdhani", sans-serif',
                    fontSize: '1rem',
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  {tasks.find(t => t.id === activeId)?.title}
                </Typography>
              </Box>
              <Chip
                label={tasks.find(t => t.id === activeId)?.priority.toUpperCase()}
                size="small"
                sx={{
                  backgroundColor: (() => {
                    const priority = tasks.find(t => t.id === activeId)?.priority;
                    switch (priority) {
                      case 'high': return '#ff0040';
                      case 'medium': return '#ffaa00';
                      case 'low': return '#00ffff';
                      default: return '#fff';
                    }
                  })(),
                  color: '#000',
                  fontWeight: 600,
                  fontFamily: '"Rajdhani", sans-serif',
                  fontSize: '0.7rem',
                }}
              />
            </Paper>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default KanbanBoard;
