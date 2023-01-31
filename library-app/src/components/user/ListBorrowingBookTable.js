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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid, InputAdornment, SvgIcon, TextField, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { openOrderModal } from '../../redux/orderSlice';
import { formatDate } from '../../utils/format-date';
import { apiGetAllOrder } from '../../services/User';

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
        id: 'user',
        disablePadding: false,
        label: 'Người mượn',
    },
    {
        id: 'book',
        disablePadding: false,
        label: 'Sách mượn',
    },
    {
        id: 'price',
        disablePadding: false,
        label: 'Tiền cọc',
    },
    {
        id: 'borrowDate',
        disablePadding: false,
        label: 'Ngày Mượn'
    },
    {
        id: 'returned',
        disablePadding: false,
        label: 'Trạng thái'
    },
    {
        id: 'returnedDate',
        disablePadding: false,
        label: 'Ngày trả'
    },
];


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

export default function ListBorrowingBookTable() {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(5);
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const reload = useSelector(state => state.reload.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const getOrders = async() => {
            try {
                const response = await apiGetAllOrder(page, rowsPerPage, user);
                if (response.data.status === 200) {
                    let orderDatas = response.data.data.map((p) => {
                        return {
                            ...p,
                            user: p.userId,
                            book: p.book.title,
                            borrowDate: p.borrowDate === null ? null : formatDate(p.borrowDate),
                            dueDate: p.dueDate === null ? null : formatDate(p.dueDate),
                            returnedDate: p.returnedDate === null ? null : formatDate(p.returnedDate)
                        }
                    })

                    setOrders(orderDatas);
                }
            } catch(err) {
                console.log(err);
            }
        }

        getOrders();
    }, [page, rowsPerPage, user, reload.order])

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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            </Box> */}
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
                            {stableSort(orders, getComparator(order, orderBy))
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
                                                return p.id === 'returned' ? (
                                                    <TableCell
                                                        key={index}
                                                        // component="th"
                                                        // id={labelId}
                                                        // scope="row"
                                                        // padding="none"
                                                        sx={{ minWidth: '12em' }}
                                                    >
                                                        <Box 
                                                            variant="contained"
                                                            sx={{ 
                                                                backgroundColor: row[p.id] === false ? '#6633CC' : row[p.id] === true ? '#33CC00' : '#FF3030',
                                                                cursor: 'default',
                                                                width: '50%',
                                                                color: '#fff',
                                                                borderRadius: '12px',
                                                                textAlign: 'center',
                                                                padding: '2px'
                                                            }}
                                                        >
                                                            {row[p.id] === false ? 'Đang thuê' : row[p.id] === true ? 'Đã trả' : 'Quán hạn'}
                                                        </Box>
                                                    </TableCell>
                                                ) : p.id === 'action' ? (
                                                    <TableCell key={index}>
                                                        <Grid sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                            <EditIcon 
                                                                color='primary'
                                                                onClick={() => dispatch(openOrderModal(row.code))}
                                                            />
                                                            {/* <DeleteIcon color='error'/> */}
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