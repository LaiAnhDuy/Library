import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

const listType = [
    {
        id: 1,
        name: 'Truyện tranh'
    },
    {
        id: 2,
        name: 'Tiểu thuyết'
    },
    {
        id: 3,
        name: 'Khoa học'
    }
]

const BookField = [
    {
        id: 'name',
        label: 'Tên sách',
        type: 'text',
    },
    {
        id: 'type',
        label: 'Thể loại',
        type: 'select',
        listSelect: listType
    },
    {
        id: 'author',
        label: 'Tác giả',
        type: 'text'
    },
    {
        id: 'number_pages',
        label: 'Số trang',
        type: 'text',
    },
    {
        id: 'publisher',
        label: 'Nhà xuất bản',
        type: 'text'
    },
    {
        id: 'purchase_data',
        label: 'Ngày mua sách',
        type: 'date'
    },
    {
        id: 'description',
        label: 'Nội dung',
        type: 'text'
    }
]

const INIT_BOOK = {
    name: '',
    type: null,
    author: '',
    number_pages: '',
    publisher: '',
    purchase_data: null,
    description: ''
}

export default function CreateBookForm(props) {
    const [book, setBook] = useState(INIT_BOOK)

    const handleChangeBook = (property) => (event) => {
        setBook({ ...book, [property]: event.target.value });
    }

    console.log(book);

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
                <Button variant="contained">Thêm mới</Button>
            </Grid>
        </Grid>
    )
}