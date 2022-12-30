import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { books } from "../../constant/fakeData";

export default function BookDetail(props) {
    const classes = useStyles();
    const { id } = useParams();
    const book = books[id - 1];
    return (
        <MainLayout>
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3} sx={{ display: "flex" }}>
                                <img src={book.image} alt={book.name} className={classes.img}/>
                            </Grid>
                            <Grid item xs={9}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6">Tên sách: {book.name}</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6">Nhà xuất bản: {"Giáo dục Việt Nam"}</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Button variant="contained"> Thuê sách</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </MainLayout>
    )
}

const useStyles = makeStyles({
    img: {
        objectFit: 'cover',
        width: '100%',
    }
})