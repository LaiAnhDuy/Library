import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function RegisterForm() {
    const [reader, setReader] = useState({
        username: "",
        password: "",
        fullname: "",
        phoneNumber: "",
        gender: null,
        dateOfBirth: null,
        address: "",
    })

    const handleChangeReader = (property, value) => {
        setReader({ ...reader, [property]: value })
    }

    console.log(reader);
    return (
        <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid item xs={6}>
                <TextField
                    label="Tên đăng nhập"
                    value={reader.username}
                    onChange={(e) => handleChangeReader("username", e.target.value)}
                    fullWidth
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Mật khẩu"
                    value={reader.password}
                    onChange={(e) => handleChangeReader("password", e.target.value)}
                    fullWidth
                    variant="outlined"
                    type={'password'}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Họ và tên"
                    value={reader.fullname}
                    onChange={(e) => handleChangeReader("fullname", e.target.value)}
                    fullWidth
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Số điện thoại"
                    value={reader.phoneNumber}
                    onChange={(e) => handleChangeReader("phoneNumber", e.target.value)}
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
                            handleChangeReader("dateOfBirth", newValue)}}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel>Giới tính</FormLabel>
                    <RadioGroup
                        row
                        value={reader.gender}
                        onChange={(e) => handleChangeReader("gender", +e.target.value)}
                    >
                        <FormControlLabel value={1} control={<Radio />} label="Nam" />
                        <FormControlLabel value={2} control={<Radio />} label="Nữ" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Địa chỉ"
                    value={reader.address}
                    onChange={(e) => handleChangeReader("address", e.target.value)}
                    fullWidth
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" fullWidth>Đăng kí</Button>
            </Grid>
        </Grid>
    )
}