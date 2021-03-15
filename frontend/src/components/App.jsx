import React from "react";
import Signup from "./Signup";
// import { Container } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// const theme = createMuiTheme({
//   palette: {
//     type: "dark",
//   },
// });

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
          // type: prefersDarkMode ? "dark" : "light",
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
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Paper className={classes.root} square>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
          </Paper>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
