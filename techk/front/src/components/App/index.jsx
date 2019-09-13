import React from "react"
import Headline from "../Headline"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// export default class App extends React.Component {
//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12">
//             <Headline>aaa ajadsajaja!!!</Headline>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }



// {this.state.todos.map(item => (
//     <div key={item.id}>
//       <h1>{item.titulo}</h1>
//       <span>{item.precio}</span>
//     </div>
//   ))}



const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
} 


export default class App extends React.Component {
    state = {
        todos: []
      }; 
      async componentDidMount() {
        try {
          const res = await fetch('http://127.0.0.1:8000/rest/libros/categoria/1');
          const todos = await res.json();
          this.setState({
            todos
          });
        } catch (e) {
          console.log(e);
        }
      }
      render() {
        return (
            <div>
             <Headline>hola</Headline>
          </div>
            
        );
      }
  }
  