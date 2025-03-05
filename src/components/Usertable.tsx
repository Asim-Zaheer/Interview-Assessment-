import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { User } from '../features/users/userTypes';

interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 100,
            headerClassName: 'custom-header',
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 150,
            headerClassName: 'custom-header',
        },
        {
            field: 'age',
            headerName: 'Age',
            flex: 0.5,
            minWidth: 70,
            headerClassName: 'custom-header',
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            minWidth: 100,
            headerClassName: 'custom-header',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 150,
            headerClassName: 'custom-header',
            renderCell: (params: GridRenderCellParams) => (
                <Box display="flex" gap={1}>
                    <Button
                        size="small"
                        onClick={() => onEdit(params.row)}
                        sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => onDelete(params.row.id)}
                        sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box
            sx={{
                width: '100%',
                overflowX: 'auto', 
                overflowY: 'auto',  
                maxHeight: { xs: 400, sm: 'none' },  
                '& .MuiDataGrid-root': {
                    fontSize: { xs: '12px', sm: '14px' },  
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f7f7f7',
                    fontSize: { xs: '12px', sm: '14px' },
                    fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                    fontSize: { xs: '12px', sm: '14px' },
                },
            }}
        >
            <DataGrid
                rows={users}
                columns={columns}
                autoHeight={false}
                getRowId={(row) => row.id}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableColumnMenu
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-root': {
                        overflowX: 'auto',  
                    },
                }}
            />
        </Box>
    );
}
