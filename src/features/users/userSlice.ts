import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from './userTypes';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(BASE_URL);
    return response.data.map((user: { id: number; name: string; email: string; age?: number }) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age ?? 25,
        role: 'Viewer',
    }));
});

export const addUser = createAsyncThunk('users/addUser', async (user: User) => {
    const response = await axios.post(BASE_URL, user);
    return { ...user, id: response.data.id };
});


export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
    await axios.put(`${BASE_URL}/${user.id}`, user);
    return user;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

// Slice definition
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as User[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state) => { state.loading = false; })

            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) state.users[index] = action.payload;
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u.id !== action.payload);
            });
    },
});

export default usersSlice.reducer;
