import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { openAlertModal } from "../../redux/alertSlice";
import { closeLoadingModal, openLoadingModal } from "../../redux/loadingSlice";
import { apiCreateBook } from "../../services/Book";
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

export default function CreateBookForm(props) {
    const [book, setBook] = useState(INIT_BOOK);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async() => {
            try {
                const response = await apiGetAllCategory();
                if (response.data.status === 200) {
                    setCategories(response.data.data);
                }
            } catch(err) {
                console.log(err);
            }
        }
        
        getCategories();
    }, [])

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

    const handleChangeBook = (property) => (event) => {
        setBook({ ...book, [property]: event.target.value });
    }

    const handleCreateBook = async() => {
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
            const response = await apiCreateBook(data);
            dispatch(closeLoadingModal());
            if (response.data.status === 200) {
                dataAlert = { ...dataAlert, severity: 'success', isOpen: true, message: response.data.message };
                // setBook(INIT_BOOK);
                props.onLoad();
            }
            else dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: response.data.message };
            dispatch(openAlertModal(dataAlert));
        } catch(err) {
            console.log(err);
            dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: "Thêm sách thất bại" };
            dispatch(closeLoadingModal());
            dispatch(openAlertModal(dataAlert));
        }
    }

    return (
        <Grid container spacing={2}>
            {BookField.map((p, index) => {
                return (
                    <Grid key={index} item xs={4}>
                        {p.type === 'select' ? (
                            <Autocomplete
                                options={p.listSelect}
                                getOptionLabel={(option) => option.name}
                                value={book[p.id]}
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
                                    onChange={(newValue) => setBook({...book, [p.id]: newValue})}
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
                                onChange={handleChangeBook(p.id)}
                            />
                        )}
                    </Grid>
                )
            })}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleCreateBook}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}