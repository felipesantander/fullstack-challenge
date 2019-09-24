import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { render } from "react-dom"


const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  
  export default function CardBook1(props) {
    const libro = props.libro
    const classes = useStyles();
    const url_image='http://books.toscrape.com/'+libro.miniatura_url

    
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            //image={props.src_imagen}
            image={url_image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {libro.titulo}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {libro.descipcion}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {libro.cantidad}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Eliminar
          </Button>
        </CardActions>
      </Card>
    );
  } 
  