import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { User } from '../features/users/userTypes';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (user: User) => void;
    defaultValues?: User | null;
}

export default function UserForm({ open, onClose, onSubmit, defaultValues }: Props) {
    const { control, handleSubmit, reset } = useForm<User>({
        defaultValues: defaultValues || {
            id: Date.now(),
            name: '',
            email: '',
            age: 18,
            role: 'Viewer',
        },
    });

    const handleFormSubmit = (data: User) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{defaultValues ? 'Edit User' : 'Add User'}</DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Name" fullWidth margin="dense" />}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Email" fullWidth margin="dense" />}
                    />
                    <Controller
                        name="age"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Age" type="number" fullWidth margin="dense" />}
                    />
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} select label="Role" fullWidth margin="dense">
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Editor">Editor</MenuItem>
                                <MenuItem value="Viewer">Viewer</MenuItem>
                            </TextField>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
