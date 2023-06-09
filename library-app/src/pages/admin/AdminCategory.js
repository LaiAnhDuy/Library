import { Box, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import AdminBookTable from '../../components/admin/AdminBookTable';
import AdminCategoryTable from '../../components/admin/AdminCategoryTable';
import CreateCategoryForm from '../../components/admin/CreateCategoryForm';
import MainLayoutAdmin from '../../components/admin/MainLayoutAdmin';

export default function AdminCategory(props) {
  const [load, setLoad] = useState(false);

  const handleChangeLoad = () => {
    setLoad(!load);
  };

  const classes = useStyles();
  return (
    <MainLayoutAdmin>
      <Card>
        <CardContent>
          <Box sx={{ marginBottom: '1em' }}>
            <Typography variant="body1" color={'primary'}>
              Thêm thể loại mới
            </Typography>
            <Box className={classes.wrapForm}>
              <CreateCategoryForm onLoad={handleChangeLoad} />
            </Box>
          </Box>
          <Box sx={{ marginBottom: '1em' }}>
            <Typography variant="body1" color={'primary'}>
              Danh sách thể loại
            </Typography>
            <Box className={classes.wrapForm}>
              <AdminCategoryTable load={load} />
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
