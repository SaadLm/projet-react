import { createSlice } from '@reduxjs/toolkit';

// État initial
const initialState = {
    tasks: [],
    filter: 'all', // 'all', 'completed', 'incomplete'
};

// Slice des tâches
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ id: Date.now(), text: action.payload, completed: false });
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addTask, toggleTask, deleteTask, setFilter } = todoSlice.actions;

export const selectTasks = (state) => {
    if (state.todo.filter === 'completed') {
        return state.todo.tasks.filter(task => task.completed);
    } else if (state.todo.filter === 'incomplete') {
        return state.todo.tasks.filter(task => !task.completed);
    }
    return state.todo.tasks;
};

export const selectFilter = (state) => state.todo.filter;

export default todoSlice.reducer;
