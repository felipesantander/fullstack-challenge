import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import App from "../App"
import CardBook from "../CardBook"
import { render } from "react-dom"

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  root: {
    padding: theme.spacing(2, 4),
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

}));

function btn_categoria(categoria,esLibro) {
  function sayHello() {
    render(
      <App esLibro='True' nombre_categoria= {categoria.nombre_categoria} id={categoria.id} url={categoria.url}/>,
      document.getElementById('app')
    );
  }
  var retorno
  if (esLibro){
      retorno = <CardBook libro={categoria}></CardBook>
  }
  else{
    retorno = <Badge color="primary" badgeContent={categoria.libros.length}>
                <Button  onClick={sayHello} value={categoria} size="large" variant="outlined">{categoria.nombre_categoria}</Button>
              </Badge>

  }
  return (
    <div>
      {retorno}
    </div>
  );
}

export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const categorias = props.categorias
  const esLibro = props.esLibro
  function handleChange(event) {
    setSpacing(Number(event.target.value));
  }
const grilla = categorias.map(value => (
  <Grid key={value.id} item> 
    {btn_categoria(value, esLibro)}
  </Grid>
))

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {grilla}
        </Grid>
      </Grid>
    </Grid>
  );
}

