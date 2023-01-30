import { Box, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AdminUserTable from "../../components/admin/AdminUserTable";
import MainLayoutAdmin from "../../components/admin/MainLayoutAdmin";

export default function AdminUser(props) {
    const classes = useStyles();
    return (
        <MainLayoutAdmin>
            <Card>
                <CardContent>
                    <Box sx={{ marginBottom: '1em' }}>
                        <Typography variant="body1" color={'primary'}>
                            Danh sách bạn đọc
                        </Typography>
                        <Box className={classes.wrapForm}>
                            <AdminUserTable />
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