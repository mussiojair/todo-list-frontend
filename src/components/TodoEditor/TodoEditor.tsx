import React from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Container, Typography, Paper, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useTodoEditor from './TodoEditor.services.tsx';

export default function TodoEditor() {

    const {
        todos,
        newTodo,
        editingTodoId,
        editingTodoText,
        addTodoItem,
        deleteTodoItem,
        toggleTaskCompletion,
        startEditing,
        saveEditedTodoItem,
        handleNewTodoChange,
        handleEditTodoChange,
    } = useTodoEditor();

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
                        value={newTodo}
                        onChange={handleNewTodoChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={addTodoItem}
                    >
                        Agregar
                    </Button>
                </Grid>
            </Grid>

            <List>
                {todos.map((task) => (
                    <Paper key={task.id} style={{ margin: '10px 0', padding: '10px' }}>
                        <ListItem
                            secondaryAction={
                                <div>
                                    <IconButton edge="end" aria-label="edit" onClick={() => startEditing(task.id, task.name)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTodoItem(task.id)}>
                                        <Delete />
                                    </IconButton>
                                </div>
                            }
                        >
                            <Checkbox
                                checked={task.completed}
                                onClick={() => toggleTaskCompletion(task.id)}
                            />
                            {/* On editing state, display text field */}
                            {editingTodoId === task.id ? (
                                <TextField
                                    value={editingTodoText}
                                    onChange={handleEditTodoChange}
                                    onBlur={saveEditedTodoItem} // Save when onBlur
                                    fullWidth
                                    variant="standard"
                                />
                            ) : (
                                <ListItemText
                                    primary={task.name}
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