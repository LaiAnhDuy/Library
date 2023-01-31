import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { books, users } from "../../constant/fakeData";
import { openAlertModal } from "../../redux/alertSlice";
import { closeLoadingModal, openLoadingModal } from "../../redux/loadingSlice";
import { reloadOrder } from "../../redux/reloadSlice";
import { apiGetAllBook } from "../../services/Book";
import { apiCreateOrder } from "../../services/Order";
import { apiGetAllUser } from "../../services/User";

const INIT_ORDER = {
    user: null,
    book: null,
    price: 0,
}

export default function CreateOrderForm(props) {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [order, setOrder] = useState(INIT_ORDER);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await apiGetAllUser(0, 1000);
                if (response.data.status === 200) {
                    setUsers(response.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        const getBooks = async () => {
            try {
                const response = await apiGetAllBook(0, 1000, '', null);
                if (response.data.status === 200) {
                    setBooks(response.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getUsers();
        getBooks();
    }, [])

    const orderField = useMemo(() => {
        return [
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
                id: 'price',
                label: 'Tiền cọc',
                type: 'text'
            },
        ]
    }, [users, books])

    const handleChangeOrder = (property) => (event) => {
        setOrder({ ...order, [property]: event.target.value });
    }

    const handleCreateOrder = async() => {
        let dataAlert = {
            isOpen: false,
            severity: 'success',
            message: ''
        }
        try {
            dispatch(openLoadingModal());
            let orderData = {
                userId: order.user.id,
                bookId: order.book.id,
                price: parseInt(order.price)
            }
            const response = await apiCreateOrder([orderData]);
            dispatch(closeLoadingModal());
            if (response.data.status === 200) {
                dataAlert = { ...dataAlert, severity: 'success', isOpen: true, message: response.data.message };
                setOrder(INIT_ORDER);
                dispatch(reloadOrder());
            }
            else dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: response.data.message };
            dispatch(openAlertModal(dataAlert));
        } catch(err) {
            console.log(err);
            dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: "Thêm thể loại thất bại" };
            dispatch(closeLoadingModal());
            dispatch(openAlertModal(dataAlert));
        }
    }

    return (
        <Grid container spacing={2}>
            {orderField.map((p, index) => {
                return (
                    <Grid key={index} item xs={4}>
                        {p.type === 'select' ? (
                            <Autocomplete
                                options={p.listSelect}
                                getOptionLabel={(option) => p.id === 'user' ? option.fullname : option.title}
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
                                    onChange={(newValue) => setOrder({ ...order, [p.id]: newValue })}
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
                <Button variant="contained" onClick={handleCreateOrder}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}