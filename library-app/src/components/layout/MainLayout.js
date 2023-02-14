import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header, { DrawerHeader } from '../header/Header';

export default function MainLayout({ children }) {
  const classes = useStyles();
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Box
        component="main"
        // maxWidth={"md"}
        className={classes.main}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  main: {
    flexGrow: 1,
    // padding: '24px 72px',
    padding: '24px 0',
    backgroundColor: '#94aefc',
    minHeight: '100vh',
  },
});
