import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, TextField, Avatar } from "@material-ui/core";
import NavDrawer from "../components/NavDrawer";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../lib/redux_helper";
import { auth, generateUserDocument } from "../firebase";

const getCardMinWidth = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 800) {
    return '100%';
  } else if (windowInnerWidth < 1200) {
    return '50%';
  } else {
    return '40%';
  }
};

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: getCardMinWidth(),
    // minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    // transform: "translate(0%,-10%)",
    padding: '1em 2em 2em 2em',
  },
}));

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target);
    try {
      setLoading(true);
      await props.login(emailRef.current.value, passwordRef.current.value);
      enqueueSnackbar("Logged In", { variant: "success" });
      history.push("/");
    } catch {
      enqueueSnackbar("Failed to log in", { variant: "error" });
      setLoading(false);
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithGoogle();
      enqueueSnackbar('Logged In', { variant: 'success' });
      history.push('/');
    } catch {
      enqueueSnackbar('Failed to log in', { variant: 'error' });
      setLoading(false);
    }
  }

  return (
    <NavDrawer>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          mt={10}
          bgcolor="background.default"
        >
          <Card className={classes.card} color="secondary">
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <Typography
                  variant='h3'
                  component='h3'
                  style={{ textAlign: 'center' }}
                >
                  Login
                </Typography>
                <div>
                  <TextField
                    fullWidth
                    inputRef={emailRef}
                    margin="normal"
                    label="Email"
                    type="email"
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    margin="normal"
                    inputRef={passwordRef}
                    label="Password"
                    type="password"
                  />
                </div>
                <br />
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={loading}
                >
                  Login
                </Button>
                <br /> <br /> <br />
                <Button onClick={handleClick} fullWidth>
                  <Avatar alt='Google Logo' src='/google.png' />
                  <Box m={1} />
                  Sign in with Google
                </Button>
              </CardContent>
            </Form>
            <Box mt={3}>
              <CardActions>
                <Typography>
                  Need an account? <Link to="/signup">Sign Up</Link>
                </Typography>
              </CardActions>
              <CardActions>
                <Typography>
                  <Link to="/forgot-password">Forgot your password?</Link>
                </Typography>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Container>
    </NavDrawer>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
