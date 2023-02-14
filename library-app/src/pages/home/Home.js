import {
  Box,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  PaginationItem,
  Radio,
  TextField,
  Typography,
} from '@mui/material';
import MainLayout from '../../components/layout/MainLayout';
import { makeStyles } from '@mui/styles';
import { useEffect, useMemo, useState } from 'react';
import BookCard from '../../components/home/BookCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { apiGetAllBook } from '../../services/Book';
import { apiGetAllCategory } from '../../services/Category';

export default function Home() {
  const classes = useStyles();
  const [checked, setChecked] = useState(null);
  const [categories, setCategories] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const size = useMemo(() => {
    return 8;
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await apiGetAllCategory();
        if (response.data.status === 200) {
          setCategories(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await apiGetAllBook(
          page - 1,
          size,
          nameFilter,
          checked,
        );
        if (response.data.status === 200) {
          setCount(response.data.data[0].totalPages);
          setBooks(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getBooks();
  }, [checked, nameFilter, size, page]);

  const handleChangeFilter = (id) => (event) => {
    setChecked(id);
  };

  return (
    <MainLayout>
      <Container maxWidth="false">
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{ height: '100%' }}>
            <Card className={classes.card}>
              <Box>
                <Typography variant="h6">Các loại sách</Typography>
                <Box sx={{ ml: 2 }}>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      {categories.map((p, index) => {
                        return (
                          <FormControlLabel
                            key={p.id}
                            control={
                              <Radio
                                checked={p.code === checked}
                                onChange={handleChangeFilter(p.code)}
                              />
                            }
                            label={p.name}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={10}>
            <Card className={classes.card}>
              <Box className={classes.searchWrap}>
                <Box sx={{ width: '20em' }}>
                  <TextField
                    variant="outlined"
                    label="Search"
                    value={nameFilter}
                    size="small"
                    onChange={(e) => setNameFilter(e.target.value)}
                    fullWidth
                  />
                </Box>
              </Box>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {books?.map((p, index) => {
                  return (
                    <Grid item xs={3} key={index}>
                      <BookCard book={p} />
                    </Grid>
                  );
                })}
              </Grid>
              <Box className={classes.pagination}>
                <Pagination
                  className=""
                  count={count}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              </Box>
            </Card>
          </Grid>
          {/* <Grid item xs={2}>
            <BookDetailCard book={books[0]}/>
          </Grid> */}
        </Grid>
      </Container>
    </MainLayout>
  );
}

const useStyles = makeStyles({
  card: {
    padding: 12,
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  pagination: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
});
