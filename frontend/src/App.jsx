import React, { useState, useEffect } from 'react';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import EditorDevPage from './pages/EditorDevPage';
import ModulePreviewDevPage from './pages/ModulePreviewDevPage';
import Main from './pages/Main';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserProfile from './pages/UserProfile';
import AddModulePage from './pages/AddModule';
import EditModulePage from './pages/EditModulePage';
import DisplayModulePage from './pages/DisplayModulePage';
import { realtimeUpdateTheme } from './firebase';


import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [dbTheme, setDBTheme] = useState('light');
  const { currentUser } = useAuth();
  const darkTheme = createMuiTheme({
    palette: {
      type: dbTheme ? dbTheme : prefersDarkMode,
    },
  });

  useEffect(async () => {
    realtimeUpdateTheme(currentUser.uid, setDBTheme);
    // const theme = await getTheme(currentUser, setDBTheme);
    // console.log(theme);
    // setDBTheme(theme);
  }, []);

  const useStyles = makeStyles({
    root: {
      backgroundColor: darkTheme.palette.background.default,
      minHeight: '100vh',
      height: '100%',
      backgroundColor: theme.palette.background.default,
      minHeight: "100vh",
      minWidth: "100vw",
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
              <PrivateRoute exact path='/' component={Main} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <PrivateRoute path='/user-profile' component={UserProfile} />
                  <Route
                    path='/roadmap-vis'
                    component={Roadmap}
                  />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/module/add' component={AddModulePage} />
              <Route path='/module/edit/:id' component={EditModulePage} />
              <Route path='/module/:id' component={DisplayModulePage} />
              <Route path='/forgot-password' component={ForgotPassword} />
              {/* Everything Below is for developing and experimenting components instead of an actual page */}
              <Route path='/editor' component={EditorDevPage} />
              <Route
                path='/module-preview-dev'
                component={ModulePreviewDevPage}
              />
            </Switch>
          </Paper>
        </ThemeProvider>
      </SnackbarProvider>
    </Router>
};

export default App;
