import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useDispatch } from 'react-redux';
import { Grid, InputAdornment, SvgIcon, TextField, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        disablePadding: false,
        label: 'Tên sách',
    },
    {
        id: 'code_card',
        disablePadding: false,
        label: 'Số thẻ',
    },
    {
        id: 'dateOfBirth',
        disablePadding: false,
        label: 'Ngày sinh',
    },
    {
        id: 'status',
        disablePadding: false,
        label: 'Trạng thái'
    },
    {
        id: 'action',
        disablePadding: false,
        label: '',
    },
];

const listUser = [
    {
        id: 1,
        name: "User 1",
        status: 1,
        dateOfBirth: "20/10/2001",
        code_card: "123456789"
    },
    {
        id: 2,
        name: "User 2",
        status: 2,
        dateOfBirth: "20/10/2001",
        code_card: "123456789"
    },
    {
        id: 3,
        name: "User 3",
        status: 1,
        dateOfBirth: "20/10/2001",
        code_card: "123456789"
    },
    {
        id: 4,
        name: "User 4",
        status: 2,
        dateOfBirth: "20/10/2001",
        code_card: "123456789"
    },
    {
        id: 5,
        name: "User 5",
        status: 1,
        dateOfBirth: "20/10/2001",
        code_card: "123456789"
    },
    {
        id: 6,
        name: "User 6",
        status: 1,
        dateOfBirth: "20/10/2001",
        code_card: "123456789"
    },
]

function BasicTable(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell >
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

BasicTable.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function AdminUserTable() {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(5);
    const [users, setUsers] = useState(listUser);
    const [searchBook, setSearchBook] = useState("");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeSearchCustomer = (event) => {
        setSearchBook(event.target.value);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ width: 400 }}>
                    <TextField
                        fullWidth
                        value={searchBook}
                        onChange={handleChangeSearchCustomer}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SvgIcon
                                        color="action"
                                        fontSize="small"
                                    >
                                        <SearchIcon />
                                    </SvgIcon>
                                </InputAdornment>
                            )
                        }}
                        size="small"
                        placeholder="Search book"
                        variant="outlined"
                        sx={{
                            '& .MuiInputBase-input': {
                                bgcolor: theme.palette.background.default
                            },
                            '& .MuiOutlinedInput-root': {
                                bgcolor: theme.palette.background.default
                            }
                        }}
                    />
                </Box>
            </Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <BasicTable
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={count}
                        />
                        <TableBody>
                            {stableSort(users, getComparator(order, orderBy))
                                ?.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            sx={{ cursor: 'pointer' }}
                                            key={row.id}
                                        >
                                            <TableCell ></TableCell>
                                            {headCells.map((p, index) => {
                                                return p.id === 'status' ? (
                                                    <TableCell
                                                        key={index}
                                                        sx={{ minWidth: '12em' }}
                                                    >
                                                        <Box 
                                                            variant="contained"
                                                            sx={{ 
                                                                backgroundColor: row[p.id] === 1 ? '#28a745' : '#dc3545',
                                                                cursor: 'default',
                                                                width: '30%',
                                                                color: '#fff',
                                                                borderRadius: '12px',
                                                                textAlign: 'center',
                                                                padding: '2px'
                                                            }}
                                                        >
                                                            {row[p.id] === 1 ? 'Active' : 'Blocked'}
                                                        </Box>
                                                    </TableCell>
                                                ) : p.id === 'action' ? (
                                                    <TableCell key={index}>
                                                        <Grid sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                            <EditIcon color='info'/>
                                                            {row.status === 1 ? 
                                                                <LockIcon color='error'/> :
                                                                <LockOpenIcon color='success'/>
                                                            }
                                                        </Grid>
                                                    </TableCell>
                                                ) : (
                                                    <TableCell key={index} sx={{ minWidth: '12em' }}>{row[p.id]}</TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={matchDownSM ? [] : [5, 10, 25]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}