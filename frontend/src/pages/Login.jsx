import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, TextField } from "@material-ui/core";
import NavDrawer from "../components/NavDrawer";
import { useSnackbar } from "notistack";

const getCardMinWidth = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 800) {
    return "100%";
  } else if (windowInnerWidth < 1200) {
    return "50%";
  } else {
    return "40%";
  }
};

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: getCardMinWidth(),
    // minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    // transform: "translate(0%,-10%)",
    padding: "1em 2em 2em 2em",
  },
}));

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      enqueueSnackbar("Logged In", { variant: "success" });
      history.push("/");
    } catch {
      enqueueSnackbar("Failed to log in", { variant: "error" });
    }
    setLoading(false);
  }

  return (
    <NavDrawer>
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          mt={10}
          bgcolor='background.default'
        >
          <Card className={classes.card} color='secondary'>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <Typography
                  variant='h3'
                  component='h3'
                  style={{ textAlign: "center" }}
                >
                  Login
                </Typography>
                <div>
                  <TextField
                    fullWidth
                    inputRef={emailRef}
                    margin='normal'
                    label='Email'
                    type='email'
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    margin='normal'
                    inputRef={passwordRef}
                    label='Password'
                    type='password'
                  />
                </div>
                <br />
                <Button
                  fullWidth
                  type='submit'
                  color='primary'
                  variant='contained'
                  disabled={loading}
                >
                  Login
                </Button>
              </CardContent>
            </Form>
            <CardActions>
              <Typography>
                Need an account? <Link to='/signup'>Sign Up</Link>
              </Typography>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </NavDrawer>
  );
};
export default Login;
