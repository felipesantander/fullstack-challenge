import React, { SyntheticEvent } from 'react';
import { fade, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Scanner from '@material-ui/icons/Scanner';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function MyAppBar(props) {
  const classes = useStyles();
  var titulo, icon,icon1
  const estado= props.estado

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (estado.v_libro){
    titulo  = estado.nombre_categoria
    icon=<IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  onClick={retorno_inicio}
                  aria-label="open drawer"
                >
                  <ExitToApp />
                </IconButton>
    icon1=<IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          onClick={reload_categoria}
          aria-label="open drawer"
        >
          <ExitToApp />
        </IconButton>
              
  }
  else{
    titulo= 'libreria'
    icon=<IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  onClick={handleClickOpen}
                  aria-label="open drawer"
                >
                  <Scanner />
                </IconButton>
  
  }

  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };

  function reload_categoria(){

    var n_url = estado.url.replaceAll('/',',')
    axios.get('http://127.0.0.1:8000/tejedor/categorias/url="'+n_url  +'"')
    .then(response => {
      console.log(response.data)
      setOpen(false);} )
  }

  function inicia_scraper(){
    axios.get('http://127.0.0.1:8000/tejedor/categorias')
    .then(response => {
      console.log(response.data)
      setOpen(false);} )
  }

  function retorno_inicio() {
    window.location.reload(false);
  }


  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {icon}
          {icon1}
          <Typography className={classes.title} variant="h6" noWrap>
            {titulo}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          </div>
          <div className={classes.sectionMobile}>
          </div>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alerta de tejedor"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Quieres iniciar la captura de categorias?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={inicia_scraper} color="primary">
            Si
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}