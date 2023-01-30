import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { books, users } from "../../constant/fakeData";

const orderField = [
    {
        id: 'user',
        label: 'Đọc giả',
        type: 'select',
        listSelect: users
    },
    {
        id: 'book',
        label: 'Sách mượn',
        type: 'select',
        listSelect: books
    },
    {
        id: 'deposit',
        label: 'Tiền cọc',
        type: 'text'
    },
    {
        id: 'dateOfHire',
        label: 'Ngày thuê',
        type: 'date'
    },
    {
        id: 'dateOfPay',
        label: 'Ngày trả',
        type: 'date',
    },
    {
        id: 'description',
        label: 'Ghi chú',
        type: 'text'
    }
]

const INIT_ORDER = {
    user: null,
    book: null,
    deposit: 0,
    dateOfHire: null,
    dateOfPay: null,
    description: '',
}

export default function CreateOrderForm(props) {
    const [order, setOrder] = useState(INIT_ORDER)

    const handleChangeOrder = (property) => (event) => {
        setOrder({ ...order, [property]: event.target.value });
    }

    console.log(order);

    return (
        <Grid container spacing={2}>
            {orderField.map((p, index) => {
                return (
                    <Grid key={index} item xs={4}>
                        {p.type === 'select' ? (
                            <Autocomplete
                                options={p.listSelect}
                                getOptionLabel={(option) => option.name}
                                value={order[p.id]}
                                onChange={(event, newValue) => setOrder({ ...order, [p.id]: newValue })}
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
                                    value={order[p.id]}
                                    onChange={(newValue) => setOrder({...order, [p.id]: newValue})}
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
                                value={order[p.id]}
                                fullWidth
                                onChange={handleChangeOrder(p.id)}
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