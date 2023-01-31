import { Box, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import AdminBookTable from "../../components/admin/AdminBookTable";
import CreateBookForm from "../../components/admin/CreateBookForm";
import MainLayoutAdmin from "../../components/admin/MainLayoutAdmin";

export default function AdminBook(props) {
    const classes = useStyles();
    const [load, setLoad] = useState(false);

    const handleChangeLoad = () => {
        setLoad(!load);
    }

    return (
        <MainLayoutAdmin>
            <Card>
                <CardContent>
                    <Box sx={{ marginBottom: '1em' }}>
                        <Typography variant="body1" color={'primary'}>Thêm sách mới</Typography>
                        <Box className={classes.wrapForm}>
                            <CreateBookForm onLoad={handleChangeLoad}/>
                        </Box>
                    </Box>
                    <Box sx={{ marginBottom: '1em' }}>
                        <Typography variant="body1" color={'primary'}>
                            Danh sách sách
                        </Typography>
                        <Box className={classes.wrapForm}>
                            <AdminBookTable load={load}/>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </MainLayoutAdmin>
    )
}

const useStyles = makeStyles({
    wrapForm: {
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '6px',
    }
})