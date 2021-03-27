import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Container, Box, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavDrawer from '../components/NavDrawer';
import { useSnackbar } from 'notistack';

import { connect } from 'react-redux';
import {
  mapStateToProps,
  mapDispatchToProps,
  resetPassword,
} from '../lib/redux_helper';

const getCardMinWidth = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 800) {
    return '100%';
  } else if (windowInnerWidth < 1200) {
    return '70%';
  } else {
    return '80%';
  }
};

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: getCardMinWidth(),
    backgroundColor: theme.palette.background.paper,
    transform: 'translate(0%,-10%)',
    padding: '1em 2em 1em 2em',
  },
  cardaction: {
    justifyContent: 'center',
  },
}));

const ForgotPassword = (props) => {
  const emailRef = useRef();
  // const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      enqueueSnackbar('Failed to reset password', { variant: 'error' });
    }
    setLoading(false);
  }

  return (
    <NavDrawer>
      <Container maxWidth='sm'>
        <Box
          display='flex'
          justifyContent='center'
          mt={'30%'}
          maxHeight='100vh'
          bgcolor='background.default'
        >
          <Card className={classes.card}>
            <CardContent>
              <h2 className='text-center mb-4'>Password Reset</h2>
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
    </NavDrawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
