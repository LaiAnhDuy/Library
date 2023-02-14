import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { apiSignUp } from '../../services/Authentication';
import { closeLoadingModal, openLoadingModal } from '../../redux/loadingSlice';
import { useNavigate } from 'react-router-dom';
import { openAlertModal } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';

export default function RegisterForm() {
  const [reader, setReader] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
    // gender: null,
    dateOfBirth: null,
    phone: '',
    // address: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeReader = (property, value) => {
    setReader({ ...reader, [property]: value });
  };

  const handleRegister = async () => {
    let dataAlert = {
      isOpen: false,
      severity: 'success',
      message: '',
    };
    try {
      dispatch(openLoadingModal());
      const response = await apiSignUp({ ...reader, roleId: 2 });
      dispatch(closeLoadingModal());
      if (response.data.status === 200) {
        dataAlert = {
          ...dataAlert,
          severity: 'success',
          isOpen: true,
          message: response.data.message,
        };
        navigate('/login');
        dispatch(openAlertModal(dataAlert));
      } else {
        dataAlert = {
          ...dataAlert,
          severity: 'error',
          isOpen: true,
          message: response.data.message,
        };
        dispatch(openAlertModal(dataAlert));
      }
    } catch (err) {
      console.log(err);
      dispatch(closeLoadingModal());
      dataAlert = {
        ...dataAlert,
        severity: 'error',
        isOpen: true,
        message: 'Đăng kí thất bại',
      };
      dispatch(openAlertModal(dataAlert));
    }
  };

  return (
    <Grid container spacing={3} sx={{ alignItems: 'center' }}>
      <Grid item xs={6}>
        <TextField
          label="Tên đăng nhập"
          value={reader.username}
          onChange={(e) => handleChangeReader('username', e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Mật khẩu"
          value={reader.password}
          onChange={(e) => handleChangeReader('password', e.target.value)}
          fullWidth
          variant="outlined"
          type={'password'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Họ và tên"
          value={reader.fullname}
          onChange={(e) => handleChangeReader('fullname', e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          value={reader.email}
          onChange={(e) => handleChangeReader('email', e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Số điện thoại"
          value={reader.phone}
          onChange={(e) => handleChangeReader('phone', e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Ngày sinh"
            inputFormat="dd/MM/yyyy"
            value={reader.dateOfBirth}
            onChange={(newValue) => {
              handleChangeReader('dateOfBirth', newValue);
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" fullWidth onClick={handleRegister}>
          Đăng kí
        </Button>
      </Grid>
    </Grid>
  );
}
