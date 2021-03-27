import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import EditorDevPage from './pages/EditorDevPage';
import ModulePreviewDevPage from './pages/ModulePreviewDevPage';
import Main from './pages/Main';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddModulePage from './pages/AddModulePage';
import UserProfile from './pages/UserProfile';
import EditModulePage from './pages/EditModulePage';
import DisplayModulePage from './pages/DisplayModulePage';
import Roadmap from './pages/Roadmap';
import { grey } from '@material-ui/core/colors';
import { realtimeUpdateTheme } from './firebase';

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './lib/redux_helper';

const App = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [dbTheme, setDBTheme] = useState('light');
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
    if (props.currentUser && props.currentUser.uid) {
      props.loadUser(props.currentUser.uid);
      console.log(props.currentUser);
      realtimeUpdateTheme(props.currentUser.uid, setDBTheme);
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
      <SnackbarProvider maxSnack={10}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Paper className={classes.root} elevation={0} square>
            <Switch>
              <PrivateRoute
                exact
                component={Main}
                path='/'
                authed={props.auth.currentUser}
              />
              <PrivateRoute
                component={Dashboard}
                exact
                path='/dashboard'
                authed={props.auth.currentUser}
              />
              <PrivateRoute
                path='/update-profile'
                component={UpdateProfile}
                authed={props.auth.currentUser}
              />
              <PrivateRoute
                path='/user-profile'
                component={UserProfile}
                authed={props.auth.currentUser}
              />
              <Route path='/roadmap-vis' component={Roadmap} />
              <Route path='/signup' component={Signup} />
              <Route path='/module/add' component={AddModulePage} />
              <Route path='/login' component={Login} />
              <Route
                path='/module/display/:username/:module_id'
                component={DisplayModulePage}
              />
              <Route path='/module/add' component={AddModulePage} />
              <Route
                path='/module/edit/:username/:module_id'
                component={EditModulePage}
              />
              <Route path='/forgot-password' component={ForgotPassword} />
              {/* Everything Below is for developing and experimenting components instead of an actual page */}
              <Route path='/editor' component={EditorDevPage} />
              <Route
                path='/module-preview-dev'
                component={ModulePreviewDevPage}
              />
              <Route path='/roadmap-vis' component={Roadmap} />
            </Switch>
          </Paper>
        </ThemeProvider>
      </SnackbarProvider>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
