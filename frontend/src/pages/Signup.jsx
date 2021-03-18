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
import Alert from "@material-ui/lab/Alert";
import NavDrawer from "../components/NavDrawer";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    transform: "translate(0%,-10%)",
    padding: "1em 2em 1em 2em",
  },
}));

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      enqueueSnackbar("Account Created", { variant: "success" });
      history.push("/");
    } catch {
      enqueueSnackbar("Failed to create an account", { variant: "error" });
    }
    setLoading(false);
  }

  return (
    <NavDrawer>
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          mt={"15%"}
          maxHeight='100vh'
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
                  Sign Up
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
                <div>
                  <TextField
                    fullWidth
                    margin='normal'
                    inputRef={passwordConfirmRef}
                    label='Confirm Password'
                    type='password'
                  />
                </div>
                <br />
                <Button
                  fullWidth
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={loading}
                >
                  Sign Up
                </Button>
              </CardContent>
            </Form>
            <CardActions>
              <Typography>
                Already have an account? <Link to='/login'>Log In</Link>
              </Typography>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </NavDrawer>
  );
};
export default Signup;
