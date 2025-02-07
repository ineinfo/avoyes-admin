import PropTypes from 'prop-types';
import { Box, Typography, Button, Stack, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Iconify from 'src/components/iconify';

function UserModalComponent({ row, onClose }) {
    return (
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, minWidth: '40vw', mx: 'auto', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}>
            {/* Close button */}
            <Stack direction="row" justifyContent="flex-end">
                <IconButton onClick={onClose}>
                    <Iconify icon="bi:x" width={24} height={24} />
                </IconButton>
            </Stack>

            <Typography variant="h6" gutterBottom>Users</Typography>

            {/* Users Table */}
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.users && row.users.length > 0 ? (
                            row.users.map((user) => (
                                <TableRow key={user.user_id}>
                                    <TableCell>{user.first_name} {user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">No users available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

UserModalComponent.propTypes = {
    row: PropTypes.shape({
        users: PropTypes.arrayOf(
            PropTypes.shape({
                user_id: PropTypes.string.isRequired,
                first_name: PropTypes.string.isRequired,
                last_name: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UserModalComponent;