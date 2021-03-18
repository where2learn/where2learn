import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Container, Box, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    transform: "translate(0%,-10%)",
    padding: "1em 2em 1em 2em",
  },
  cardaction: {
    justifyContent: "center",
  },
}));

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        p={1}
        height='100vh'
        bgcolor='background.default'
      >
        <Card className={classes.card}>
          <CardContent>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert severity='error'>{error}</Alert>}
            {message && <Alert severity='success'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                inputRef={emailRef}
                margin='normal'
                label='Email'
                type='email'
                required
              />
              <br />
              <br />
              <Button
                disabled={loading}
                color='primary'
                variant='contained'
                fullWidth
                type='submit'
              >
                Reset Password
              </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to='/login'>Login</Link>
            </div>
          </CardContent>
          <CardActions>
            <div className='w-100 text-center mt-2'>
              Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
