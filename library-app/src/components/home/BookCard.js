import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

export default function BookCard(props) {
    const { id, title, image, description } = props.book;
    const classes = useStyles();
    return (
        <Card>
            <CardActionArea LinkComponent={Link} to={`/books/${id}`}>
                <CardMedia
                    component={"img"}
                    image={image}
                    alt="Book image"
                    height="140"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const useStyles = makeStyles({
    img: {
        objectFit: "cover"
    }
})