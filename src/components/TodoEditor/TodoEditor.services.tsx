import React, { ChangeEvent, useState } from 'react';
import TodoItem from '../../models/TodoItem';

const useTodoEditor = () => {

    const [todos, setTodos] = useState<TodoItem[]>([]); // todo items state
    const [newTodo, setNewTodo] = useState<string>(''); // new todo item state
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null); // editing state
    const [editingTodoText, setEditingTodoText] = useState<string>(''); // text on current editing item

    
    // Add Todo item
    const addTodoItem = (): void => {
        if (newTodo.trim() === '') return; // No empty items
        const newTaskObject: TodoItem = {
            id: Date.now(),
            text: newTodo,
            completed: false
        };
        setTodos([...todos, newTaskObject]);
        setNewTodo(''); // clear input
    };

    // Función para eliminar una tarea
    const deleteTodoItem = (id: number): void => {
        setTodos(todos.filter(task => task.id !== id));
    };

    // Set a task as completed or pending
    const toggleTaskCompletion = (id: number): void => {
        setTodos(todos.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    // Start editing on item by id
    const startEditing = (id: number, text: string): void => {
        setEditingTodoId(id);
        setEditingTodoText(text);
    };

    // Save changes on edited item
    const saveEditedTodoItem = (): void => {
        setTodos(todos.map(task =>
            task.id === editingTodoId ? { ...task, text: editingTodoText } : task
        ));
        setEditingTodoId(null);
        setEditingTodoText(''); // clear editing text
    };

    // Handle new item
    const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTodo(e.target.value);
    };

    // Handler for editing field
    const handleEditTodoChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEditingTodoText(e.target.value);
    };

    return {
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
    };
};

export default useTodoEditor;
