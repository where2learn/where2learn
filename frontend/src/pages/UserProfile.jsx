import React, { useState, useEffect, useRef } from 'react';
import NavDrawer from '../components/NavDrawer';
import { Box, Avatar, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey, grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {
  Settings,
  StarHalf,
  CreditCard,
  ReportProblemSharp,
} from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import {
  getUserInfo,
  getModulesByUsername,
  getStarModules,
  updateAvatar,
} from '../firebase';
import ModuleList from '../components/ModuleList';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  centerImage: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 20,
  },
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[700]),
    backgroundColor: blueGrey[700],
  },
  grey: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  info: {
    marginRight: '30px',
    marginLeft: '10px',
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();
  const [state, setState] = useState('Modules');
  // const [stars, setStars] = useState([]);
  const [numStars, setNumStars] = useState(0);
  const [open, setOpen] = useState(false);
  // previous state
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const { auth, modules } = props;
  const previousState = usePrevious({ auth: auth, modules: modules });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSave = () => {
    const textField = document.getElementById('name');
    props.updateAvatar(props.auth.currentUser.uid, textField.value);
    setOpen(false);
  };

  const getStarCounts = (modules) => {
    const star = modules.reduce((prev, module) => {
      return prev + module.num_star;
    }, 0);
    return star;
  };

  useEffect(() => {
    (async () => {
      if (props.auth.currentUser) {
        // console.log(props.auth.currentUser);
        const user = await props.loadUser(props.auth.currentUser.uid);
        // console.log(user);
        const modules = await props.loadModules(user.username);
        setNumStars(getStarCounts(modules));
        await props.loadStarModules(user.username);
      }
    })();
  }, []);

  useEffect(() => {
    if (previousState) {
      if (
        JSON.stringify(previousState.auth) !== JSON.stringify(props.auth) ||
        JSON.stringify(previousState.modules) !== JSON.stringify(props.modules)
      ) {
        console.log('here');
        if (props.auth.currentUser && props.auth.user) {
          (async () => {
            await props.loadUser(props.auth.currentUser.uid);
            props.loadModules(props.auth.user.username).then((modules) => {
              // console.log(modules);
              setNumStars(getStarCounts(modules));
            });
            props.loadStarModules(props.auth.user.username);
          })();
        }
      }
    }
  }, [props]);

  const getCurrentState = () => {
    if (state === 'Modules') {
      return <ModuleList modules={props.modules} />;
    } else if (state === 'Stars') {
      return <ModuleList modules={props.starModules} />;
    }
    return <ListItem> {state} </ListItem>;
  };

  const toggleState = (e) => {
    e.preventDefault();
    setState(e.target.innerText);
  };

  return (
    <NavDrawer>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={2}
          style={{ marginRight: '100px' }}
        >
          {/* <Avatar
            variant='square'
            className={[
              classes.blueGrey,
              classes.large,
              classes.centerImage,
            ].join(' ')}
            onMouseEnter={() => {
              const avatar = document.getElementById('avatar');
              if (avatar) {
                avatar.style.opacity = 0.5;
              }
            }}
            onMouseLeave={() => {
              const avatar = document.getElementById('avatar');
              if (avatar) {
                avatar.style.opacity = 1;
              }
            }}
            onClick={handleClickOpen}
          >
            {props.auth.user && props.auth.user.avatar ? (
              <img
                src={props.auth.user.avatar}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                id='avatar'
              />
            ) : (
              'JT'
            )}
          </Avatar> */}
          <Dialog open={open} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Change Your Avatar</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please make sure your avatar link is accessible
              </DialogContentText>
              <Input
                autoFocus
                margin='dense'
                id='name'
                label='Avatar Resource:'
                fullWidth
                color='primary'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCloseSave}>Save</Button>
            </DialogActions>
          </Dialog>
          <br />
          <br />

          <Card className={classes.root}>
            <CardContent>
              <Box
                component='span'
                display='block'
                className={classes.centerText}
              >
                {props.auth.user ? props.auth.user.username : 'NULL'}
              </Box>
            </CardContent>
            <CardActions style={{ paddingLeft: 20, paddingBottom: 15 }}>
              <StarHalf /> {numStars}
            </CardActions>
          </Card>
          <br />

          <Paper rounded='true' elevation3='true' className={classes.paper}>
            <List className={classes.root}>
              <ListItem button onClick={toggleState}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Modules' />
              </ListItem>
              <ListItem button onClick={toggleState}>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Stars' />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7} xl={8}>
          {getCurrentState()}
        </Grid>
      </Grid>
    </NavDrawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
