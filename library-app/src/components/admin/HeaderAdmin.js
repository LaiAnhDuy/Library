import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import LogoImg from '../../assets/images/Logo.png'
import UserSection from '../header/UserSection';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const ListItem = [
    {
        name: 'Trang chủ',
        icon: DashboardIcon,
        path: '/admin'
    },
    {
        name: 'Quản lý loại sách',
        icon: CategoryIcon,
        path: '/admin/categories'
    },
    {
        name: 'Quản lý sách',
        icon: BookIcon,
        path: '/admin/books',
    },
    {
        name: 'Quản lý bạn đọc',
        path: '/admin/users',
        icon: AccountCircleIcon
    },
    {
        name: 'Quản lý thuê sách',
        path: '/admin/orders',
        icon: InventoryIcon
    },
]

export default function HeaderAdmin() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const selectedIndex = React.useMemo(() => {
        const selectedId = location.pathname;
        const index = ListItem.findIndex((Item) => Item.path === selectedId);
        return index === -1 ? 0 : index;
    }, [location]);


    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {

    }

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <IconButton
                            // color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            component={Link}
                            to="/admin"
                            sx={{ display: 'flex' , alignItems: 'center', textDecoration: 'none' }}>
                            <img src={LogoImg} alt="Logo" className={classes.logo}/>
                            <Typography 
                                variant="body1" 
                                color="primary" 
                                sx={{ fontSize: 20, fontWeight: 'bold' }}
                            >
                                Library
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <UserSection />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {ListItem.map((p, index) => {
                        const Icon = p.icon;
                        return (
                            <ListItemButton
                                key={p.name}
                                component={Link}
                                to={p.path}
                                selected={index === selectedIndex}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {<Icon />}
                                </ListItemIcon>
                                <ListItemText primary={p.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        )
                    })}
                </List>
            </Drawer>
        </>
    );
}

const useStyles = makeStyles({
    appbar: {
        '&.MuiAppBar-root': {
            backgroundColor: "#fff",
            // boxShadow: "none",
        }

    },
    logo: {
        width: 60,
        objectFit: 'cover',
        marginRight: 5
    }
})