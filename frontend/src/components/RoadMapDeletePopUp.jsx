import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import DisplayModule from './DisplayModule';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  // we will need props.setDeleteOpen, props.SetDeleteState, props.deleteOpen, props.module

  const handleCancel = () => {
    props.setDeleteOpen(false);
  };

  const handleConfirm = () => {
    props.setDeleteConfirm(true);
    props.setDeleteOpen(false);
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>
        {'Are you sure you want to delete this module from your roadmap?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          <DisplayModule />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Disagree
        </Button>
        <Button onClick={handleConfirm} color='primary'>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
