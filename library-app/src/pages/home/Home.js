import { Box, Card, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, Pagination, PaginationItem, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import BookCard from "../../components/home/BookCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookDetailCard from "../../components/home/BookDetailCard";

const listFilter = [
  {
    id: 1,
    name: "Khoa học"
  },
  {
    id: 2,
    name: "Truyện tranh"
  },
  {
    id: 3,
    name: "Tiểu thuyết"
  },
  {
    id: 4,
    name: "Toán học"
  }
]

const books = [
  {
    id: 1,
    name: "Book 1",
    type: 1,
    image: "https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp",
    description: "Lizards are a widespread group of squamate reptiles."
  },
  {
    id: 2,
    name: "Book 2",
    type: 1,
    image: "https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp",
    description: "Lizards are a widespread group of squamate reptiles.Lizards are a widespread group of squamate reptiles.Lizards are a widespread group of squamate reptiles."
  },
  {
    id: 2,
    name: "Book 2",
    type: 1,
    image: "https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp",
    description: "Lizards are a widespread group of squamate reptiles."
  },
  {
    id: 2,
    name: "Book 2",
    type: 1,
    image: "https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp",
    description: "Lizards are a widespread group of squamate reptiles."
  },
  {
    id: 2,
    name: "Book 2",
    type: 1,
    image: "https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp",
    description: "Lizards are a widespread group of squamate reptiles."
  },
  {
    id: 2,
    name: "Book 2",
    type: 1,
    image: "https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp",
    description: "Lizards are a widespread group of squamate reptiles."
  },
  {
    id: 2,
    name: "Book 2",
    type: 1,
    image: "https://lzd-img-global.slatic.net/g/p/7c0c5545a2cab812ef846ff85f919d36.jpg_720x720q80.jpg_.webp",
    description: "Lizards are a widespread group of squamate reptiles."
  },

]

export default function Home() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  const handleChangeFilter = (id) => (event) => {
    if (event.target.checked) {
      setChecked([...checked, id]);
    }
    else {
      setChecked(checked.filter((e) => e !== id));
    }
  }
  const handleCheckded = (id) => {
    return checked.findIndex((e) => e === id) !== -1;
  }

  console.log(checked);

  return (
    <MainLayout>
      <Container maxWidth="false">
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{ height: "100%" }}>
            <Card className={classes.card}>
              <Box>
                <Typography variant="h6">
                  Các loại sách
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      {listFilter.map((p, index) => {
                        return (
                          <FormControlLabel
                            key={p.id}
                            control={
                              <Checkbox checked={handleCheckded(p.id)} onChange={handleChangeFilter(p.id)} />
                            }
                            label={p.name}
                          />
                        )
                      })}
                    </FormGroup>
                  </FormControl>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card className={classes.card}>
              <Box className={classes.searchWrap}>
                <Box sx={{ width: "20em" }}>
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
                {books.map((p, index) => {
                  return (
                    <Grid item xs={3} key={index}>
                      <BookCard book={p} />
                    </Grid>
                  )
                })}
              </Grid>
              <Box className={classes.pagination}>
                <Pagination
                  className=""
                  count={10}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <BookDetailCard book={books[0]}/>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}

const useStyles = makeStyles({
  card: {
    padding: 12
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
    justifyContent: 'center'
  }
})
