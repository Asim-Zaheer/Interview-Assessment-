import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../features/users/userSlice';
import { RootState, AppDispatch } from '../app/store';
import UserTable from '../components/Usertable';
import UserForm from '../components/UsreForm';
import { User } from '../features/users/userTypes';
import { Button, TextField, Box, Typography, Stack, Paper } from '@mui/material';

export default function Dashboard() {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);

    const [openForm, setOpenForm] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setOpenForm(true);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id));
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setOpenForm(true);
    };

    const handleSubmit = (user: User) => {
        if (editingUser) {
            dispatch(updateUser(user));
        } else {
            dispatch(addUser(user));
        }
        setOpenForm(false);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box p={3} sx={{ maxWidth: '1200px', margin: 'auto' }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
                sx={{ fontSize: { xs: '18px', sm: '22px', md: '26px' } }}
            >
                User Management Dashboard
            </Typography>

            <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <TextField
                        label="Search Users"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddUser}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Add New User
                    </Button>
                </Stack>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    overflowX: 'auto',
                    overflowY: 'auto',
                    maxHeight: { xs: '400px', sm: 'none' },
                }}
            >
                <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
            </Paper>

            <UserForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSubmit={handleSubmit}
                defaultValues={editingUser}
            />
        </Box>
    );
}
