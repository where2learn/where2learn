import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from 'notistack';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fab from '@material-ui/core/Fab';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(3) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  barBottom: {
    marginTop: 'auto',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuFab: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  menuIconWrapper: {
    '&:hover': {
      color: '#3498db',
    },
  },
  menuIcon: {
    color: 'inherit',
  },
}));

const NavDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [darkTheme, setDarkTheme] = React.useState(false);
  const { currentUser, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const smScreenMatch = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    enqueueSnackbar(`Theme Switched to "${darkTheme ? 'DARK' : 'LIGHT'}"`, {
      variant: 'info',
    });
  }, [darkTheme, enqueueSnackbar]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await logout();
      enqueueSnackbar('Logged Out', { variant: 'success' });
      history.push('/login');
    } catch {
      enqueueSnackbar("Couldn't Log Out", { variant: 'error' });
    }
  };

  const toggleDrawer2 = (open2) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen2(open2);
  };

  const MenuContent = () => (
    <React.Fragment>
      <List>
        <ListItem button key='dashboard' className={classes.menuIconWrapper}>
          <ListItemIcon className={classes.menuIcon}>
            <Tooltip title='Dashboard' placement='right'>
              <DashboardIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem
          button
          key='home'
          className={classes.menuIconWrapper}
          onClick={() => history.push('/')}
        >
          <ListItemIcon className={classes.menuIcon}>
            <Tooltip title='Home' placement='right'>
              <HomeIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key='add-module'
          className={classes.menuIconWrapper}
          onClick={() => {
            history.push('/add-module');
          }}
        >
          <ListItemIcon className={classes.menuIcon}>
            <Tooltip title='Add Module' placement='right'>
              <AddCircleIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary='Add Module' />
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem
          onClick={() => setDarkTheme(!darkTheme)}
          button
          key='toggle-theme'
          className={classes.menuIconWrapper}
        >
          <ListItemIcon className={classes.menuIcon}>
            <Tooltip title='Toggle Theme' placement='right'>
              {darkTheme ? <Brightness2Icon /> : <Brightness7Icon />}
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary='Toggle Theme' />
        </ListItem>

        {currentUser ? (
          <>
            <ListItem
              onClick={handleLogout}
              button
              key='logout'
              className={classes.menuIconWrapper}
            >
              <ListItemIcon className={classes.menuIcon}>
                <Tooltip title='Logout' placement='right'>
                  <ExitToAppIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
            <ListItem
              onClick={() => history.push('/update-profile')}
              button
              key='setting'
              className={classes.menuIconWrapper}
            >
              <ListItemIcon className={classes.menuIcon}>
                <Tooltip title='Setting' placement='right'>
                  <SettingsIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary='Setting' />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              onClick={() => history.push('/login')}
              button
              key='login'
              className={classes.menuIconWrapper}
            >
              <ListItemIcon className={classes.menuIcon}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary='Sign In' />
            </ListItem>
            <ListItem
              onClick={() => history.push('/signup')}
              button
              key='signup'
              className={classes.menuIconWrapper}
            >
              <ListItemIcon className={classes.menuIcon}>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary='Sign Up' />
            </ListItem>
          </>
        )}
      </List>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      {smScreenMatch ? (
        <React.Fragment>
          <div className='fixed-top'>
            <Fab
              onClick={toggleDrawer2(true)}
              size='large'
              color='primary'
              aria-label='memu'
              className={classes.menuFab}
            >
              <MenuIcon />
            </Fab>
          </div>
          <SwipeableDrawer
            anchor='top'
            open={open2}
            onClose={toggleDrawer2(false)}
            onOpen={toggleDrawer2(true)}
          >
            <div
              className={clsx(classes.list, {
                [classes.fullList]: true,
              })}
              role='presentation'
              onClick={toggleDrawer2(false)}
              onKeyDown={toggleDrawer2(false)}
            >
              <MenuContent />
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ) : (
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <MenuContent />
          <Divider />
          <List className={classes.barBottom}>
            <ListItem
              button
              key='toggle-drawer'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              edge='start'
              className={classes.menuIconWrapper}
            >
              <ListItemIcon className={classes.menuIcon}>
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

export default NavDrawer;
