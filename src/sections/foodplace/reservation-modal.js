import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, TableRow, TableHead } from '@mui/material';
import { format } from 'date-fns';

export default function ReservationModal({ open, onClose, row }) {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reservation`);
            const filteredReservations = response.data.data.filter(reservation => reservation.food_place_id === row.id);
            setReservations(filteredReservations);
        } catch (error) {
            console.error('Failed to fetch reservations', error);
            setReservations([]);
        }
    };
    useEffect(() => {
        if (open) {
            fetchReservations();
        }
    }, [open]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMM yyyy');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayData = reservations.length > 0 ? reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Reservation Data</DialogTitle>
            <DialogContent>
                {reservations.length === 0 ? (
                    <p>No reservation found</p>
                ) : (
                    <>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>People</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayData.map((reservation) => (
                                    <TableRow key={reservation.id}>
                                        <TableCell>{reservation.first_name || '-'}</TableCell>
                                        <TableCell>{reservation.last_name || '-'}</TableCell>
                                        <TableCell>{reservation.email || '-'}</TableCell>
                                        <TableCell>{reservation.phone || '-'}</TableCell>
                                        <TableCell>{reservation.date ? formatDate(reservation.date) : '-'}</TableCell>
                                        <TableCell>{reservation.time || '-'}</TableCell>
                                        <TableCell align="center">{reservation.people || '-'}</TableCell>
                                        <TableCell align="center">{reservation.status || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={reservations.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

ReservationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired,
};
