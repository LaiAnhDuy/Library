import { useMemo } from "react";
import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';


const getSevenDayRecent = () => {
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let result = [];
    const date = new Date();
    for (let i = 6; i >= 0; i--) {
        let tmpDate = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);
        result.push(`${tmpDate.getDate()} ${months[tmpDate.getMonth()]}`);
    }

    return result;

}

export default function ChartDashBoard(props) {
    const series = useMemo(() => {
        return [{
            name: 'Số đọc giả mới',
            data: props.newUserIn7Days,
        }, {
            name: 'Số lượt mượn sách mới',
            data: props.newBorrowingIn7Days
        }]
    }, [props.newBorrowingIn7Days, props.newUserIn7Days]);
    console.log(series);
    const options = useMemo(() => {
        return {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '100%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: getSevenDayRecent(),
            },
            yaxis: {
                title: {
                    text: 'Số lượng'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            }
        }
    }, [])
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: '6px',
                border: '1px solid #ccc',
                bgcolor: '#fff',
                // alignItems: 'center',
                // height: '100%',
            }}
        >
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </Box>
    )
}