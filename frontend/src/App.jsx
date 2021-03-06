import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Main from './pages/Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddModulePage from './pages/AddModulePage';
import UserProfile from './pages/UserProfile';
import EditModulePage from './pages/EditModulePage';
import DisplayModulePage from './pages/DisplayModulePage';
import SetUsernamePage from './pages/SetUsernamePage';
import Roadmap from './pages/Roadmap';
import NotFoundPage from './pages/NotFoundPage';
import { grey } from '@material-ui/core/colors';
import { realtimeUpdateTheme } from './firebase';
import { useSnackbar } from 'notistack';

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps,
  resetPassword,
} from './lib/redux_helper';

const App = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [dbTheme, setDBTheme] = useState('light');
  const { enqueueSnackbar } = useSnackbar();
  // const { currentUser } = useAuth();
  const darkTheme = createMuiTheme({
    palette: {
      bg: {
        l1: dbTheme === 'dark' ? grey[900] : grey[50],
        l2: dbTheme === 'dark' ? grey[800] : grey[100],
        l3: dbTheme === 'dark' ? grey[700] : grey[200],
        l4: dbTheme === 'dark' ? grey[600] : grey[300],
        l5: dbTheme === 'dark' ? grey[500] : grey[400],
        l6: dbTheme === 'dark' ? grey[400] : grey[500],
        l7: dbTheme === 'dark' ? grey[300] : grey[600],
        l8: dbTheme === 'dark' ? grey[200] : grey[700],
        l9: dbTheme === 'dark' ? grey[100] : grey[800],
        l10: dbTheme === 'dark' ? grey[50] : grey[900],
      },
      type: dbTheme ? dbTheme : prefersDarkMode,
    },
  });

  useEffect(() => {
    console.log('Theme Changed');
    console.log(dbTheme);
    if (props.auth && props.auth.user && dbTheme !== props.auth.user.theme) {
      enqueueSnackbar(`Theme Switched to "${darkTheme ? 'DARK' : 'LIGHT'}"`, {
        variant: 'info',
      });
    }
  }, [dbTheme]);

  useEffect(() => {
    props.loadTags();
    console.log(props.auth);
    if (props.auth.currentUser && props.auth.currentUser.uid) {
      console.log(props.auth.currentUser.uid);
      props.loadUser(props.auth.currentUser.uid);
      // console.log(props.auth);
      realtimeUpdateTheme(props.auth.currentUser.uid, setDBTheme);
    }
  }, []);

  const useStyles = makeStyles({
    root: {
      backgroundColor: darkTheme.palette.background.default,
      minHeight: '100vh',
      height: '100%',
    },
  });

  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Paper className={classes.root} elevation={0} square>
          <Switch>
            <PrivateRoute exact component={Main} path='/' auth={props.auth} />
            <PrivateRoute
              component={Dashboard}
              exact
              path='/dashboard'
              auth={props.auth}
            />
            <PrivateRoute
              path='/update-profile'
              component={UpdateProfile}
              auth={props.auth}
            />
            <PrivateRoute
              path='/user-profile'
              component={UserProfile}
              auth={props.auth}
            />
            <PrivateRoute
              path='/set-username'
              component={SetUsernamePage}
              auth={props.auth}
            />
            <PrivateRoute
              path='/module/add'
              component={AddModulePage}
              auth={props.auth}
            />
            <PrivateRoute
              path='/module/display/:username/:module_id'
              component={DisplayModulePage}
              auth={props.auth}
            />
            <PrivateRoute
              path='/module/edit/:username/:module_id'
              component={EditModulePage}
              auth={props.auth}
            />
            <PrivateRoute
              path='/forgot-password'
              component={ForgotPassword}
              auth={props.auth}
            />
            <PrivateRoute
              path='/roadmap-vis/display/:username/:module_id'
              component={Roadmap}
              auth={props.auth}
            />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/*' component={NotFoundPage} />
          </Switch>
        </Paper>
      </ThemeProvider>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
