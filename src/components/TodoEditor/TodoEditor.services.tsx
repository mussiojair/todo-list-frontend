import React, { ChangeEvent, useEffect, useState } from 'react';
import TodoItem from '../../models/TodoItem';
import TodoService from '../../services/TodoService.tsx';

const parseTodoResponse: (response: any) => TodoItem = (response) => {
    const todoItem: TodoItem = {
        id: response.id,
        name: response.name,
        completed: response.completed
    };
    return todoItem;
}
const parseGetAllResponse: (response: any[]) => TodoItem[] = (response: any[]) => {
    const some: TodoItem[] = response.map((item) => {
        return parseTodoResponse(item);
    });
    return some;
};

const useTodoEditor = () => {

    const [todos, setTodos] = useState<TodoItem[]>([]); // todo items state
    const [newTodo, setNewTodo] = useState<string>(''); // new todo item state
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null); // editing state
    const [editingTodoText, setEditingTodoText] = useState<string>(''); // text on current editing item

    // initial load
    useEffect(() => {
        getAllTodo();
    }, []);

    const getAllTodo = async () => {
        const response = await TodoService.getAll();
        setTodos(parseGetAllResponse(response));
    };

    
    // Add Todo item
    const addTodoItem =  async(): Promise<void> => {
        if (newTodo.trim() === '') return; // No empty items
        const newTodoObject = {
            name: newTodo,
        };
        const response = await TodoService.create(newTodoObject);
        if (response) {
            const newItem = parseTodoResponse(response);
            setTodos([...todos, newItem]);
            setNewTodo(''); // clear input
        }
    };

    // Función para eliminar una tarea
    const deleteTodoItem = async (id: number): Promise<void> => {
        const response = await TodoService.remove(id);
        if (response) {
            setTodos(todos.filter(task => task.id !== id));
        }
    };

    // Set a task as completed or pending
    const toggleTaskCompletion = async (id: number): Promise<void> => {
        const todoItem = todos.filter((item) => item.id == id);
        if (todoItem.length == 0) { return; }
        todoItem[0].completed = !todoItem[0].completed;
        const response = await TodoService.update(id, todoItem[0]);
        if (response) {
            getAllTodo();
        }
    };

    // Start editing on item by id
    const startEditing = (id: number, text: string): void => {
        setEditingTodoId(id);
        setEditingTodoText(text);
    };

    // Save changes on edited item
    const saveEditedTodoItem = async (): Promise<void> => {
        const modifiedElement = todos.filter((item) => item.id == editingTodoId)
        if (modifiedElement.length > 0) {
            const item = modifiedElement[0];
            item.name = editingTodoText;
            const response = await TodoService.update(item.id, item);
            if (response) {
                setEditingTodoId(null);
                setEditingTodoText(''); // clear editing text
                getAllTodo();
            }
        }
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
