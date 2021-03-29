import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';
import { searchTimeoutTime, USERNAME_MIN_LENGTH } from '../constants';
import { usernameExists, updateUsername } from '../firebase';

const SetUsernamePage = (props) => {
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [helperMsg, setHelperMsg] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  React.useEffect(() => {
    if (!username && open === false) {
      setOpen(true);
    }
  }, [open]);

  const validateUsername = async () => {
    if (!(props.auth && props.auth.currentUser && props.auth.currentUser.uid)) {
      enqueueSnackbar('Current User Status Invalid', { variant: 'error' });
      setOpen(true);
      return false;
    }
    const regex = /^([a-zA-Z\d-_]+)?$/g;
    const usernameMatchPattern = username.match(regex) ? true : false;
    const exists = await usernameExists(username);
    let error = false;
    let message = '';
    if (exists) {
      error = true;
      message = 'Username Already Occupied, Please Try Another One';
    } else if (!usernameMatchPattern) {
      error = true;
      message =
        'Username Connot Contain Special Characters. Allowed Characters: alphanumeric, dash, underscore';
    } else if (username.length < 8) {
      error = true;
      message = `Username Length Must be Longer then ${USERNAME_MIN_LENGTH}`;
    } else {
      error = false;
      message = 'Valid';
    }
    if (error) {
      setOpen(true);
    }
    setError(error);
    setHelperMsg(message);
    return !error;
  };

  const usernameOnChange = () => {
    setError(false);
    setHelperMsg(null);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(setTimeout(validateUsername, searchTimeoutTime));
  };

  React.useEffect(() => {
    usernameOnChange();
  }, [username]);

  React.useEffect(() => {
    if (
      props.auth &&
      props.auth.user &&
      props.auth.user.username &&
      props.auth.currentUser.uid !== props.auth.user.username
    ) {
      history.push('/');
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async (e) => {
    if (username.length < 8) {
      setHelperMsg('Username Must be Longer than 8 characters');
      setError(true);
    } else {
      if (props.auth && props.auth.currentUser && props.auth.currentUser.uid) {
        const validUsername = await validateUsername();
        if (validUsername) {
          updateUsername(props.auth.currentUser.uid, username)
            .then((res) => {
              console.log(res);
              console.log('Successfully Updated Username');
              history.push('/');
            })
            .catch((err) => {
              console.error(err);
              console.error("Couldn't Update Username");
              enqueueSnackbar("Couldn't Update Username", { variant: 'error' });
              setOpen(true);
            });
        } else {
          console.error('Error: Unable to Update Username');
          setOpen(true);
        }
      }
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Set Username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need a unique usename name, please pick one.
          </DialogContentText>
          <TextField
            error={error}
            helperText={helperMsg}
            autoFocus
            variant='outlined'
            margin='dense'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id='name'
            label='username'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleClose(e);
              submit(e);
            }}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUsernamePage);
