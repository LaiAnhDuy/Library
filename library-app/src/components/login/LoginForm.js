import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                <Button variant="contained" fullWidth>Đăng nhập</Button>
            </Grid>
        </Grid>
    )
}