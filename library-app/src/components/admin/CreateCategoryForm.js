import { Button, Grid, TextField } from "@mui/material"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openAlertModal } from "../../redux/alertSlice";
import { closeLoadingModal, openLoadingModal } from "../../redux/loadingSlice";
import { apiCreateCategory } from "../../services/Category";

const CategoryField = [
    {
        id: 'name',
        label: 'Tên',
        type: 'text',
    }
]

const INIT_CATEGORY = {
    name: '',
}

export default function CreateCategoryForm(props) {
    const [category, setCategory] = useState(INIT_CATEGORY);
    const dispatch = useDispatch();

    const handleChangeCategory = (property) => (event) => {
        setCategory({ ...category, [property]: event.target.value });
    }

    const handleCreateCategory = async() => {
        let dataAlert = {
            isOpen: false,
            severity: 'success',
            message: ''
        }
        try {
            dispatch(openLoadingModal())
            const response = await apiCreateCategory(category);
            dispatch(closeLoadingModal());
            if (response.data.status === 200) {
                dataAlert = { ...dataAlert, severity: 'success', isOpen: true, message: response.data.message };
                setCategory(INIT_CATEGORY);
                props.onLoad();
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
            {CategoryField.map((p, index) => {
                return (
                    <Grid key={index} item xs={4}>
                            <TextField
                                label={p.label}
                                value={category[p.id]}
                                fullWidth
                                onChange={handleChangeCategory(p.id)}
                            />
                    </Grid>
                )
            })}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleCreateCategory}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}