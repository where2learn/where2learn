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

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    transform: "translate(0%,-10%)",
    padding: "1em 2em 1em 2em",
  },
}));

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          p={1}
          height='100vh'
          bgcolor='background.default'
        >
          <Card className={classes.card} color='secondary'>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <Typography
                  variant='h4'
                  component='h3'
                  style={{ textAlign: "center" }}
                >
                  Login
                </Typography>

                {error && <Alert severity='error'>{error}</Alert>}
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
    </>
  );
};
export default Login;
