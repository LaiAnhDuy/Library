import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HeaderAdmin, { DrawerHeader } from "./HeaderAdmin";

export default function MainLayoutAdmin({ children}) {
    const classes = useStyles();
    return (
        <Box sx={{ display: 'flex' }}>
            <HeaderAdmin />
            <Box
                component="main"
                // maxWidth={"md"}
                className={classes.main}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    )
}

const useStyles = makeStyles({
    main: {
        flexGrow: 1, 
        // padding: '24px 72px',
        padding: "24px",
        backgroundColor: "#94aefc",
        minHeight: '100vh', 
    }
})