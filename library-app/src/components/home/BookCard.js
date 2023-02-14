import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

export default function BookCard(props) {
  const { id, title, imgUrl, description, code } = props.book;
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea LinkComponent={Link} to={`/books/${code}`}>
        <CardMedia component={'img'} image={imgUrl} alt={title} height="140" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles({
  img: {
    objectFit: 'cover',
  },
});
