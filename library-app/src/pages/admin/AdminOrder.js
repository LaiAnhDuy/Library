import { Box, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AdminOrderTable from '../../components/admin/AdminOrderTable';
import CreateOrderForm from '../../components/admin/CreateOrderForm';
import MainLayoutAdmin from '../../components/admin/MainLayoutAdmin';

export default function AdminOrder(props) {
  const classes = useStyles();
  return (
    <MainLayoutAdmin>
      <Card>
        <CardContent>
          <Box sx={{ marginBottom: '1em' }}>
            <Typography variant="body1" color={'primary'}>
              Thêm yêu cầu thuê sách
            </Typography>
            <Box className={classes.wrapForm}>
              <CreateOrderForm />
            </Box>
          </Box>
          <Box sx={{ marginBottom: '1em' }}>
            <Typography variant="body1" color={'primary'}>
              Danh sách thuê sách
            </Typography>
            <Box className={classes.wrapForm}>
              <AdminOrderTable />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </MainLayoutAdmin>
  );
}

const useStyles = makeStyles({
  wrapForm: {
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '6px',
  },
});
