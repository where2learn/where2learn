import React from "react";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import EditorDevPage from "./pages/EditorDevPage";
import ModulePreviewDevPage from "./pages/ModulePreviewDevPage";
import Main from "./pages/Main";
import { SnackbarProvider } from "notistack";
import lightBlue from "@material-ui/core/colors/lightBlue";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserProfile from "./pages/UserProfile";
import AddModulePage from "./pages/AddModule";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./lib/redux_helper";

const App = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            // light: "#1976d2",
            // main: "#1976d2",
            // dark: "#000000",
            // contrastText: "#fff",
            main: lightBlue[800],
          },
          // secondary: {
          // light: "#90a4ae",
          // main: "#90a4ae",
          // dark: "#ba000d",
          // contrastText: "#000",
          // main: lime["A200"],
          // },
          type: prefersDarkMode ? "dark" : "light",
        },
        darker: {
          main: "#5c6ac4",
        },
      }),
    [prefersDarkMode]
  );

  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      minHeight: "100vh",
      height: "100%",
    },
  });
  const classes = useStyles();

  return (
    <Router>
      <SnackbarProvider maxSnack={10}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper className={classes.root} elevation={0} square>
              <Switch>
                <PrivateRoute
                  exact
                  path="/"
                  component={Main}
                  authed={props.currentUser}
                />
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                  authed={props.currentUser}
                />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                  authed={props.currentUser}
                />
                <PrivateRoute
                  path="/user-profile"
                  component={UserProfile}
                  authed={props.currentUser}
                />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/add-module" component={AddModulePage} />
                <Route path="/forgot-password" component={ForgotPassword} />
                {/* Everything Below is for developing and experimenting components instead of an actual page */}
                <Route path="/editor" component={EditorDevPage} />
                <Route
                  path="/module-preview-dev"
                  component={ModulePreviewDevPage}
                />
              </Switch>
            </Paper>
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
