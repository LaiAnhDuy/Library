import { Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAlertModal } from "../../redux/alertSlice";
import { closeBookModal } from "../../redux/bookSlice";
import { closeLoadingModal, openLoadingModal } from "../../redux/loadingSlice";
import { reloadBook } from "../../redux/reloadSlice";
import { apiGetBook, apiUpdateBook } from "../../services/Book";
import { apiGetAllCategory } from "../../services/Category";

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
}

export default function AdminBookDetail(props) {
    const [categories, setCategories] = useState([]);
    const [book, setBook] = useState(INIT_BOOK);

    const data = useSelector(state => state.book.data);
    const dispatch = useDispatch();

    const bookId = useMemo(() => {
        return data.bookId;
    }, [data.bookId]);

    const BookField = useMemo(() => {
        return [
            {
                id: 'title',
                label: 'Tên sách',
                type: 'text',
            },
            {
                id: 'categoryId',
                label: 'Thể loại',
                type: 'select',
                listSelect: categories
            },
            {
                id: 'author',
                label: 'Tác giả',
                type: 'text'
            },
            {
                id: 'totalPages',
                label: 'Số trang',
                type: 'text',
            },
            {
                id: 'publisher',
                label: 'Nhà xuất bản',
                type: 'text'
            },
            {
                id: 'boughtDate',
                label: 'Ngày mua sách',
                type: 'date'
            },
            {
                id: 'description',
                label: 'Nội dung',
                type: 'text'
            },
            {
                id: 'language',
                label: 'Ngôn ngữ',
                type: 'text'
            },
            {
                id: 'price',
                label: 'Giá',
                type: 'text',
            }
        ]
    }, [categories])

    useEffect(() => {
        const getBook = async () => {
            try {
                if (bookId !== null && data.isOpen === true) {
                    const responseCategories = await apiGetAllCategory();
                    if (responseCategories.data.status === 200) {
                        setCategories(responseCategories.data.data);
                    }
                    const responseBook = await apiGetBook(bookId);
                    if (responseBook.data.status === 200) {
                        setBook({
                            ...responseBook.data.data,
                            categoryId: responseCategories.data.data.find((e) => e.id === responseBook.data.data.categoryId)
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getBook();
    }, [bookId, data.isOpen])

    const handleClose = () => {
        dispatch(closeBookModal());
    }

    const handleChangeBook = (property) => (event) => {
        setBook({ ...book, [property]: event.target.value });
    }

    const handleUpdateBook = async() => {
        let dataAlert = {
            isOpen: false,
            severity: 'success',
            message: ''
        }
        try {
            let data = {
                ...book,
                price: parseInt(book.price),
                totalPages: parseInt(book.totalPages),
                categoryId: book.categoryId.id
            }
            dispatch(openLoadingModal())
            const response = await apiUpdateBook(data);
            dispatch(closeLoadingModal());
            if (response.data.status === 200) {
                dataAlert = { ...dataAlert, severity: 'success', isOpen: true, message: response.data.data };
                dispatch(reloadBook());
            }
            else dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: response.data.data };
            dispatch(openAlertModal(dataAlert));
            dispatch(closeBookModal());
        } catch(err) {
            console.log(err);
            dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: "Cập nhật thất bại" };
            dispatch(closeLoadingModal());
            dispatch(openAlertModal(dataAlert));
            dispatch(closeBookModal());
        }
    }

    return (
        <Dialog open={data.isOpen} onClose={handleClose} maxWidth="md">
            <DialogTitle>Cập nhật thông tin sách</DialogTitle>
            <DialogContent sx={{ paddingTop: '20px' }}>
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    {BookField.map((p, index) => {
                        return (
                            <Grid key={index} item xs={4}>
                                {p.type === 'select' ? (
                                    <Autocomplete
                                        options={p.listSelect}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => value?.id === option?.id}
                                        value={book[p.id]}
                                        disabled={p?.disable}
                                        onChange={(event, newValue) => setBook({ ...book, [p.id]: newValue })}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                fullWidth
                                                label={p.label}
                                            />
                                        }
                                    />
                                ) : p.type === 'date' ? (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Date desktop"
                                            inputFormat="dd/MM/yyyy"
                                            value={book[p.id]}
                                            onChange={(newValue) => setBook({ ...book, [p.id]: newValue })}
                                            disabled={p?.disable}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label={p.label}
                                                />
                                            }
                                        />
                                    </LocalizationProvider>
                                ) : (
                                    <TextField
                                        label={p.label}
                                        value={book[p.id]}
                                        fullWidth
                                        disabled={p?.disable}
                                        onChange={handleChangeBook(p.id)}
                                    />
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleUpdateBook}>Cập nhật</Button>
                <Button variant="contained" color="error" onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    )
}