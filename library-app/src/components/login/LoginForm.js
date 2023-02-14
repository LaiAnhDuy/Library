import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { apiSignIn } from '../../services/Authentication';
import LocalStorage from '../../services/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeLoadingModal, openLoadingModal } from '../../redux/loadingSlice';
import { openAlertModal } from '../../redux/alertSlice';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    let dataAlert = {
      isOpen: false,
      severity: 'success',
      message: '',
    };
    try {
      dispatch(openLoadingModal());
      const response = await apiSignIn({ username, password });
      dispatch(closeLoadingModal());
      if (response.data.status === 200) {
        dataAlert = {
          ...dataAlert,
          severity: 'success',
          isOpen: true,
          message: response.data.message,
        };
        LocalStorage.updateLocalAccessToken(response.data.data.jwtToken);
        if (response.data.data.role === 'user') {
          navigate('/');
          navigate(0);
        } else {
          navigate('/admin');
          navigate(0);
        }
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
      dataAlert = {
        ...dataAlert,
        severity: 'error',
        isOpen: true,
        message: 'Đăng nhập thất bại',
      };
      dispatch(closeLoadingModal());
      dispatch(openAlertModal(dataAlert));
      console.log(err);
    }
  };

  return (
    <Grid container spacing={3} sx={{ alignItems: 'center' }}>
      <Grid item xs={12}>
        <TextField
          label="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
          type={'password'}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Đăng nhập
        </Button>
      </Grid>
    </Grid>
  );
}
