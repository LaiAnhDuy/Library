import { Box, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function BookDetailCard(props) {
  const { name, type, image, description } = props.book;
  const classes = useStyles();
  return (
    <Card>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">Chi tiết sách</Typography>
        <img src={image} alt="Sách" className={classes.image} />
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body1" color={'text.secondary'}>
          {'Nguyễn Đình Trí'}
        </Typography>
        <Box sx={{ textAlign: 'left', marginTop: 2 }}>
          <Typography variant="h6">{'Description'}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles({
  image: {
    width: '100%',
    objectFit: 'cover',
  },
});
