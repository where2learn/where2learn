import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, TextField, Avatar } from '@material-ui/core';
import NavDrawer from '../components/NavDrawer';
import { useSnackbar } from 'notistack';
import { generateUserDocument } from '../firebase';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

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
    backgroundColor: theme.palette.background.paper,
    padding: '1em 2em 2em 2em',
  },
}));

const Signup = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const { signup, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
    }

    try {
      setLoading(true);
      const user = await props.signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      generateUserDocument(user);
      enqueueSnackbar('Account Created', { variant: 'success' });
      history.push('/');
    } catch {
      enqueueSnackbar('Failed to create an account', { variant: 'error' });
    }
    setLoading(false);
  }

  async function handleClick(e) {
    e.preventDefault();
    console.log(e.target);
    try {
      setLoading(true);
      await props.signInWithGoogle();
      enqueueSnackbar('Logged In', { variant: 'success' });
      history.push('/');
    } catch {
      enqueueSnackbar('Failed to log in', { variant: 'error' });
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
                  style={{ textAlign: 'center' }}
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
            <Box mt={1}>
              <CardActions>
                <Typography>
                  <Button onClick={handleClick}>
                    <Avatar
                      alt='Google Logo'
                      src='../../../static/images/google.png'
                    />
                    <Box m={1} />
                    Sign in with Google
                  </Button>
                </Typography>
              </CardActions>
            </Box>
            <Box mt={3}>
              <CardActions>
                <Typography>
                  Already have an account? <Link to='/login'>Log In</Link>
                </Typography>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Container>
    </NavDrawer>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
