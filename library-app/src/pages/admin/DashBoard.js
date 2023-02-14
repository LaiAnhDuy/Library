import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import MainLayoutAdmin from "../../components/admin/MainLayoutAdmin";
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useEffect, useState } from "react";
import { apiGetAnalytic } from "../../services/Analytic";
import ChartDashBoard from "../../components/admin/ChartDashBoard";
import TableDashBoard from "../../components/admin/TableDashboard";

export default function DashBoard(props) {

    const [analytic, setAnalytic] = useState({
        totalBooks: '',
        totalBorrowing: '',
        totalReader: '',
        totalNewUser: '',
        newBorrowingIn7Days: [0, 0, 0, 0, 0, 0, 0],
        newUserIn7Days: [0, 0, 0, 0, 0, 0, 0],
        overduedBorrowing: []
    })

    useEffect(() => {
        const getAnalytic = async() => {
            try {
                const response = await apiGetAnalytic();
                if (response.data.status === 200) {
                    setAnalytic({
                        ...response.data.data,
                        newBorrowingIn7Days: response.data.data.newBorrowingIn7Days.reverse(),
                        newUserIn7Days: response.data.data.newUserIn7Days.reverse()
                    });
                }
            } catch(err) {
                console.log(err);
            }
        }

        getAnalytic();
    }, [])
    
    console.log(analytic);

    const RenderAnalytic = (props) => {
        const { title, total, Icon, color, bgcolor } = props;
        return (
            <Box
                sx={{
                    p: 2,
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    bgcolor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '50%',
                        bgcolor: `${bgcolor}`,
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                    }}
                >
                    <Icon sx={{ color: `${color}`, fontSize: '32px' }} />
                </Box>
                <Typography variant="h4">{total}</Typography>
                <Typography variant="subtitle1">{title}</Typography>
            </Box>
        );
    };

    return (
        <MainLayoutAdmin>
            {/* <Card> */}
            {/* <CardContent> */}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <RenderAnalytic
                        title="Tổng số sách"
                        total={analytic.totalBooks}
                        Icon={BookmarkIcon}
                        color="#ff0000"
                        bgcolor="#ffeaea"
                    />
                </Grid>
                <Grid item xs={3}>
                    <RenderAnalytic
                        title="Số lượng sách đang mượn"
                        total={analytic.totalBorrowing}
                        Icon={AutoStoriesIcon}
                        color="#3cb878"
                        bgcolor="#d1f3e0"
                    />
                </Grid>
                <Grid item xs={3}>
                    <RenderAnalytic
                        title="Tổng số đọc giả"
                        total={analytic.totalReader}
                        Icon={GroupsIcon}
                        color="#ffa001"
                        bgcolor="#fff2d8"
                    />
                </Grid>
                <Grid item xs={3}>
                    <RenderAnalytic
                        title="Đọc giả mới"
                        total={analytic.totalNewUser}
                        Icon={GroupAddIcon}
                        color="#3f7afc"
                        bgcolor="#e1f1ff"
                    />
                </Grid>
                <Grid item xs={6}>
                    <ChartDashBoard 
                        newBorrowingIn7Days={analytic.newBorrowingIn7Days} 
                        newUserIn7Days={analytic.newUserIn7Days}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TableDashBoard orders={analytic.overduedBorrowing}/>
                </Grid>
            </Grid>
            {/* </CardContent> */}
            {/* </Card> */}
        </MainLayoutAdmin>
    )
}