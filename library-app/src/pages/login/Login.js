import { makeStyles } from '@mui/styles';
import { Box, Container, Typography } from '@mui/material';
import Logo from '../../components/logo/Logo';
import background from '../../assets/images/background.jpg';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/login/LoginForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Logo />
      <Box className={classes.section}>
        <Typography
          variant="h4"
          sx={{ px: 5, mt: 10, mb: 5, fontWeight: 'bold' }}
        >
          Chào mừng bạn đến với thư viện
        </Typography>
        <img src={background} alt="Login" className={classes.background} />
      </Box>
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Box className={classes.icon}>
            <LockOutlinedIcon sx={{ color: '#fff' }} />
          </Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Đăng nhập
          </Typography>
          <LoginForm />
          <Box className={classes.otherFeature}>
            <Link to="/forgot-password" className={classes.link}>
              Quên mật khẩu?
            </Link>
            <Link to="/register" className={classes.link}>
              Bạn chưa có tài khoản? Đăng kí tại đây
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  section: {
    flex: 3,
    // width: '100%',
    // maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    boxShadow:
      '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)',
  },
  background: {
    width: '100%',
  },
  container: {
    flex: 2,
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
  },
  content: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '96px 0px',
    minHeight: '70vh',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#9c27b0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  otherFeature: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  link: {
    color: '#1976d2',
    textDecorationColor: 'rgba(25, 118, 210, 0.4)',
  },
});
