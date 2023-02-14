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
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { bgcolor } from '@mui/system';
import { formatDate } from '../../utils/format-date';

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
        id: 'dueDate',
        disablePadding: false,
        label: 'Hạn trả'
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

export default function TableDashBoard(props) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(5);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let orderDatas = props.orders.map((p) => {
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
    }, [props.orders])

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
        <Box sx={{
            width: '100%', p: 2,
            borderRadius: '6px',
            border: '1px solid #ccc',
            bgcolor: '#fff',
            height: 399
        }}>
            <Typography variant='body1' sx={{ mb: 1 }}>Danh chưa trả sách gần nhất</Typography>
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