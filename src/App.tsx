import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Container, Typography, Paper, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Definir la interfaz para una tarea
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); // Estado para almacenar las tareas, tipado como un array de tareas
  const [newTask, setNewTask] = useState<string>(''); // Estado para almacenar la nueva tarea
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // Estado para saber si estamos editando
  const [editingTaskText, setEditingTaskText] = useState<string>(''); // Texto de la tarea en edición

  // Función para agregar una nueva tarea
  const addTask = (): void => {
    if (newTask.trim() === '') return; // Evitar agregar tareas vacías
    const newTaskObject: Task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask(''); // Limpiar el input después de agregar la tarea
  };

  // Función para eliminar una tarea
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función para marcar una tarea como completada o pendiente
  const toggleTaskCompletion = (id: number): void => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Función para iniciar la edición de una tarea
  const startEditing = (id: number, text: string): void => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  // Función para guardar los cambios de una tarea editada
  const saveEditedTask = (): void => {
    setTasks(tasks.map(task => 
      task.id === editingTaskId ? { ...task, text: editingTaskText } : task
    ));
    setEditingTaskId(null);
    setEditingTaskText(''); // Limpiar el estado de edición
  };

  // Manejador para el campo de nueva tarea
  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.target.value);
  };

  // Manejador para el campo de edición de tarea
  const handleEditTaskChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditingTaskText(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Tareas
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={9}>
          <TextField
            label="Nueva tarea"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={handleNewTaskChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={addTask}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <List>
        {tasks.map((task) => (
          <Paper key={task.id} style={{ margin: '10px 0', padding: '10px' }}>
            <ListItem
              secondaryAction={
                <div>
                  <IconButton edge="end" aria-label="edit" onClick={() => startEditing(task.id, task.text)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                    <Delete />
                  </IconButton>
                </div>
              }
            >
              <Checkbox
                checked={task.completed}
                onClick={() => toggleTaskCompletion(task.id)}
              />
              {/* Si la tarea está en edición, mostramos el campo de texto para editar */}
              {editingTaskId === task.id ? (
                <TextField
                  value={editingTaskText}
                  onChange={handleEditTaskChange}
                  onBlur={saveEditedTask} // Guardar al perder foco
                  fullWidth
                  variant="standard"
                />
              ) : (
                <ListItemText
                  primary={task.text}
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                />
              )}
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
}

export default App;
