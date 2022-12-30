import { Avatar, Box, Card, Chip, List, ListItemButton, ListItemIcon, ListItemText, Popper, Typography } from "@mui/material";
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

const ListItem = [
    {
        name: 'Thông tin cá nhân',
        icon: AccountBoxIcon,
        path: '/'
    },
    {
        name: 'Đổi mật khẩu',
        icon: ManageAccountsIcon,
        path: '/user/change-password',
    },
    {
        name: 'Đăng xuất',
        path: 'user/logout',
        icon: LogoutIcon
    },
]

export default function UserSection() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    return (
        <Box>
            <Chip
                aria-describedby={id}
                variant={open ? 'conatined' : 'outlined'}
                avatar={<Avatar sx={{
                    '&.MuiChip-avatarColorPrimary': {
                        backgroundColor: open ? '#fff' : '#1565c0',
                        color: open ? '#1565c0' : '#fff',
                    }
                }} />}
                label={"Nguyễn Du"}
                color={"primary"}
                onClick={handleToggle}
                sx={{
                    // width: "48px",
                    alignItems: 'center',

                }}
            />
            <Popper
                open={open}
                anchorEl={anchorEl}
                sx={{ zIndex: 10000 }}
                id={id}
                placement="bottom-end"
            >
                <Card>
                    <List>
                        {ListItem.map((p, index) => {
                            const Icon = p.icon;
                            return (
                                <ListItemButton
                                    key={p.name}
                                    component={Link}
                                    to={p.path}
                                    // selected={index === selectedIndex}
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
                </Card>
            </Popper>
        </Box>
    )
}