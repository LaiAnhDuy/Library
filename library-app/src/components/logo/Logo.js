import { Box } from "@mui/material";
import LogoImg from '../../assets/images/Logo.png'
import { makeStyles } from "@mui/styles";

export default function Logo() {
    const classes = useStyles();
    return (
        <Box 
            component="img"
            src={LogoImg}
            className={classes.logo}
        />
    )
}

const useStyles = makeStyles({
    logo: {
        width: 60,
        position: "fixed",
        left: 40,
        top: 10,
    }
})