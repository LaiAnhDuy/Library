import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAlertModal } from "../../redux/alertSlice";
import { closeLoadingModal, openLoadingModal } from "../../redux/loadingSlice";
import { closeOrderModal } from "../../redux/orderSlice";
import { reloadOrder } from "../../redux/reloadSlice";
import { apiUpdateOrder } from "../../services/Order";

export default function AdminOrderDetail(props) {
    const data = useSelector(state => state.order.data);
    const dispatch = useDispatch();
    const orderId = useMemo(() => {
        return data.orderId;
    }, [data.orderId]);

    const handleUpdateOrder = async() => {
        let dataAlert = {
            isOpen: false,
            severity: 'success',
            message: ''
        }
        try {
            dispatch(openLoadingModal());   
            const response = await apiUpdateOrder(orderId);
            dispatch(closeLoadingModal());
            if (response.data.status === 200) {
                dataAlert = { ...dataAlert, severity: 'success', isOpen: true, message: response.data.data };
                dispatch(reloadOrder());
            }
            else dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: response.data.data };
            dispatch(openAlertModal(dataAlert));
            dispatch(closeOrderModal());
        } catch(err) {
            console.log(err);
            dataAlert = { ...dataAlert, severity: 'error', isOpen: true, message: "Cập nhật thất bại" };
            dispatch(closeLoadingModal());
            dispatch(openAlertModal(dataAlert));
            dispatch(closeOrderModal());
        }
    }

    const handleClose = () => {
        dispatch(closeOrderModal());
    }


    return (
        <Dialog open={data.isOpen} onClose={handleClose} maxWidth="md">
            <DialogTitle>Xác nhận thông tin trả sách</DialogTitle>
            <DialogContent sx={{ paddingTop: '20px' }}>
                Xác nhận sách đã trả
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleUpdateOrder}>Xác nhận</Button>
                <Button variant="contained" color="error" onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    )
}