import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { apiGetBook } from "../../services/Book";
import { apiGetAllCategory, apiGetCategory } from "../../services/Category";

const INIT_BOOK = {
    title: '',
    categoryId: null,
    author: '',
    totalPages: '',
    publisher: '',
    boughtDate: null,
    description: '',
    language: '',
    price: '',
    imgUrl: '',
}

export default function BookDetail(props) {
    const classes = useStyles();
    const [book, setBook] = useState(INIT_BOOK);
    const { id } = useParams();

    useEffect(() => {

        const getCategory = async(id) => {
            try {
                let category = null;
                const response = await apiGetAllCategory();
                if (response.data.status === 200) {
                    category = response.data.data.find(e => e.id === id);
                }
                return category;
            } catch(err) {
                return null;
            }
        }

        const getBookDetail = async() => {
            try {
                const response = await apiGetBook(id);
                if (response.data.status === 200) {
                    const category = await getCategory(response.data.data.categoryId);
                    setBook({
                        ...response.data.data,
                        category
                    });
                }
            } catch(err) {  
                console.log(err);
            }
        }

        getBookDetail();
    }, [])

    console.log(book);
    return (
        <MainLayout>
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={3} sx={{ display: "flex" }}>
                                <img src={book.imgUrl} alt={book.name} className={classes.img}/>
                            </Grid>
                            <Grid item xs={9}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Tên sách:&emsp;</strong> 
                                            {book.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Tác giả:&emsp;</strong> 
                                            {book.author}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Nhà xuất bản: &emsp;</strong>    
                                            {book.publisher}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Thể loại:&emsp;</strong> 
                                            {book?.category?.name}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Ngôn ngữ:&emsp;</strong> 
                                            {book.language}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Tổng số trang:&emsp;</strong> 
                                            {book.totalPages}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body1">
                                            <strong>Nội dung:&emsp;</strong> 
                                            {book.description}
                                        </Typography>
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