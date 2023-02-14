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
import { Grid, TextField, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  apiDeleteCategory,
  apiGetAllCategory,
  apiUpdateCategory,
} from '../../services/Category';
import { closeLoadingModal, openLoadingModal } from '../../redux/loadingSlice';
import { openAlertModal } from '../../redux/alertSlice';

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
    id: 'id',
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    disablePadding: false,
    label: 'Tên thể loại',
  },
  {
    id: 'action',
    disablePadding: false,
    label: '',
  },
];

const listCategory = [
  {
    id: 1,
    name: 'Book 1',
    type: 1,
    image:
      'https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp',
    description: 'Lizards are a widespread group of squamate reptiles.',
    author: 'Nguyễn Đình Trí',
  },
  {
    id: 7,
    name: 'Book 2',
    type: 1,
    image:
      'https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp',
    description: 'Lizards are a widespread group of squamate reptiles.',
    author: 'Nguyễn Đình Trí',
  },
  {
    id: 2,
    name: 'Book 2',
    type: 1,
    image:
      'https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp',
    description: 'Lizards are a widespread group of squamate reptiles.',
    author: 'Nguyễn Đình Trí',
  },
  {
    id: 3,
    name: 'Book 2',
    type: 1,
    image:
      'https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp',
    description: 'Lizards are a widespread group of squamate reptiles.',
    author: 'Nguyễn Đình Trí',
  },
  {
    id: 4,
    name: 'Book 2',
    type: 1,
    image:
      'https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp',
    description: 'Lizards are a widespread group of squamate reptiles.',
    author: 'Nguyễn Đình Trí',
  },
  {
    id: 5,
    name: 'Book 2',
    type: 1,
    image:
      'https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp',
    description: 'Lizards are a widespread group of squamate reptiles.',
    author: 'Nguyễn Đình Trí',
  },
  {
    id: 6,
    name: 'Book 2',
    type: 1,
    image:
      'https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp',
    description: 'Lizards are a widespread group of squamate reptiles.',
    author: 'Nguyễn Đình Trí',
  },
];

function BasicTable(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
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

export default function AdminCategoryTable(props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(5);
  const [categories, setCategories] = useState(listCategory);
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await apiGetAllCategory();
        if (response.data.status === 200) {
          setCategories(response.data.data);
          setCount(response.data.data.length);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCategories();
  }, [props.load, update]);

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

  const handleChangeCategories = (index) => (event) => {
    let newCategories = [...categories];
    newCategories[index].name = event.target.value;
    setCategories(newCategories);
  };

  const handleUpdateCategory = async (index) => {
    let dataAlert = {
      isOpen: false,
      severity: 'success',
      message: '',
    };
    try {
      dispatch(openLoadingModal());
      const response = await apiUpdateCategory(categories[index]);
      dispatch(closeLoadingModal());
      if (response.data.status === 200) {
        dataAlert = {
          ...dataAlert,
          severity: 'success',
          isOpen: true,
          message: 'Cập nhật thành công',
        };
        setUpdate(!update);
      } else
        dataAlert = {
          ...dataAlert,
          severity: 'error',
          isOpen: true,
          message: 'Cập nhật thất bại',
        };
      dispatch(openAlertModal(dataAlert));
    } catch (err) {
      console.log(err);
      dataAlert = {
        ...dataAlert,
        severity: 'error',
        isOpen: true,
        message: 'Cập nhật thất bại',
      };
      dispatch(closeLoadingModal());
      dispatch(openAlertModal(dataAlert));
    }
  };

  const handleDeleteCategory = async (index) => {
    let dataAlert = {
      isOpen: false,
      severity: 'success',
      message: '',
    };
    try {
      dispatch(openLoadingModal());
      const response = await apiDeleteCategory(categories[index].code);
      dispatch(closeLoadingModal());
      if (response.data.status === 200) {
        dataAlert = {
          ...dataAlert,
          severity: 'success',
          isOpen: true,
          message: 'Xóa thành công',
        };
        setUpdate(!update);
      } else
        dataAlert = {
          ...dataAlert,
          severity: 'error',
          isOpen: true,
          message: 'Xóa thất bại',
        };
      dispatch(openAlertModal(dataAlert));
    } catch (err) {
      console.log(err);
      dataAlert = {
        ...dataAlert,
        severity: 'error',
        isOpen: true,
        message: 'Xóa thất bại',
      };
      dispatch(closeLoadingModal());
      dispatch(openAlertModal(dataAlert));
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <BasicTable
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={count}
            />
            <TableBody>
              {categories
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                ?.map((row, ii) => {
                  return (
                    <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                      <TableCell></TableCell>
                      {headCells.map((p, index) => {
                        return p.id === 'action' ? (
                          <TableCell key={index}>
                            <Grid
                              sx={{
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'center',
                              }}
                            >
                              <EditIcon
                                color="primary"
                                onClick={() => handleUpdateCategory(ii)}
                              />
                              <DeleteIcon
                                color="error"
                                onClick={() => handleDeleteCategory(ii)}
                              />
                            </Grid>
                          </TableCell>
                        ) : p.id === 'id' ? (
                          <TableCell key={index} sx={{ minWidth: '12em' }}>
                            {row[p.id]}
                          </TableCell>
                        ) : (
                          <TableCell key={index} sx={{ minWidth: '12em' }}>
                            <TextField
                              label=""
                              value={row[p.id]}
                              size="small"
                              sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                  border: 'none',
                                },
                              }}
                              onChange={handleChangeCategories(ii)}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
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
