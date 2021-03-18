import React from "react";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import EditorDevPage from "./components/EditorDevPage";
import NavDrawer from "./components/NavDrawer";
import { SnackbarProvider, useSnackbar } from "notistack";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            light: "#1976d2",
            main: "#1976d2",
            dark: "#000000",
            contrastText: "#fff",
          },
          secondary: {
            light: "#90a4ae",
            main: "#90a4ae",
            dark: "#ba000d",
            contrastText: "#000",
          },
          // type: "dark",
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const useStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      minHeight: "100vh",
    },
  });
  const classes = useStyles();

  return (
    <Router>
      <SnackbarProvider maxSnack={10}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Paper className={classes.root} square>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute
                  path='/update-profile'
                  component={UpdateProfile}
                />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <Route path='/editor' component={EditorDevPage} />
              </Switch>
            </Paper>
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
