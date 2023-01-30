import { Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeOrderModal } from "../../redux/orderSlice";

const listOrder = [
    {
        id: 1,
        user: "Nguyễn Hoàng Thanh",
        book: "Đại số tuyến tính",
        deposit: "1000000 VNĐ",
        dateOfHire: "1/4/2023",
        dateOfPay: "1/25/2023",
        description: "No",
        status: 1
    },
    {
        id: 2,
        user: "Nguyễn Hoàng Thanh",
        book: "Đại số tuyến tính",
        deposit: "1000000 VNĐ",
        dateOfHire: "1/4/2023",
        dateOfPay: "1/25/2023",
        description: "No",
        status: 2
    },
    {
        id: 3,
        user: "Nguyễn Hoàng Thanh",
        book: "Đại số tuyến tính",
        deposit: "1000000 VNĐ",
        dateOfHire: "1/4/2023",
        dateOfPay: "1/25/2023",
        description: "No",
        status: 3
    },
    {
        id: 4,
        user: "Nguyễn Hoàng Thanh",
        book: "Đại số tuyến tính",
        deposit: "1000000 VNĐ",
        dateOfHire: "1/4/2023",
        dateOfPay: "1/25/2023",
        description: "No",
        status: 1
    },
    {
        id: 5,
        user: "Nguyễn Hoàng Thanh",
        book: "Đại số tuyến tính",
        deposit: "1000000 VNĐ",
        dateOfHire: "1/4/2023",
        dateOfPay: "1/25/2023",
        description: "No",
        status: 3
    },
]

const listStatus = [
    {
        id: 1,
        name: 'Đang thuê',
    },
    {
        id: 2,
        name: 'Đã trả',
    },
    {
        id: 3,
        name: 'Quá hạn'
    }
]

const orderField = [
    {
        id: 'user',
        label: 'Đọc giả',
        type: 'text',
        disable: true,
    },
    {
        id: 'book',
        label: 'Sách mượn',
        type: 'text',
        disable: true
    },
    {
        id: 'deposit',
        label: 'Tiền cọc',
        type: 'text',
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
    },
    {
        id: 'status',
        label: 'Trạng thái',
        type: 'select',
        listSelect: listStatus
    }
]

const INIT_ORDER = {
    user: '',
    book: '',
    deposit: 0,
    dateOfHire: null,
    dateOfPay: null,
    description: '',
    status: null,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function AdminOrderDetail(props) {
    const data = useSelector(state => state.order.data);
    const [order, setOrder] = useState(INIT_ORDER);
    const dispatch = useDispatch();
    const orderId = useMemo(() => {
        return data.orderId;
    }, [data.orderId]);

    useEffect(() => {
        if (orderId !== null) {
            let tmp = listOrder.find((e) => e.id === orderId);
            tmp = {
                ...tmp,
                status: listStatus.find((e) => e.id === tmp.status)
            }
            setOrder(tmp);
        }
    }, [orderId])

    const handleClose = () => {
        dispatch(closeOrderModal());
    }

    const handleChangeOrder = (property) => (event) => {
        setOrder({ ...order, [property]: event.target.value });
    }

    return (
        <Dialog open={data.isOpen} onClose={handleClose} maxWidth="md">
            <DialogTitle>Cập nhật thông tin thuê sách</DialogTitle>
            <DialogContent sx={{ paddingTop: '20px' }}>
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    {orderField.map((p, index) => {
                        return (
                            <Grid key={index} item xs={4}>
                                {p.type === 'select' ? (
                                    <Autocomplete
                                        options={p.listSelect}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => value?.id === option?.id}
                                        value={order[p.id]}
                                        disabled={p?.disable}
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
                                        value={order[p.id]}
                                        fullWidth
                                        disabled={p?.disable}
                                        onChange={handleChangeOrder(p.id)}
                                    />
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleClose}>Cập nhật</Button>
                <Button variant="contained" color="error" onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    )
}