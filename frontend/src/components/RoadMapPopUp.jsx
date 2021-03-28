import { useRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    position: 'sticky',
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const RoadMapPopUp = (props) => {
  const classes = useStyles();
  const keywordInputRef = useRef();

  const handleClose = () => {
    props.setOpen(false);
  };

  const generateAllStarredList = () => {
    return (
      <List
        component='div'
        role='list'
        style={{
          overflow: 'scroll',
          maxHeight: '200px',
          width: '500px',
        }}
      >
        {props.modules.map((module) => {
          return (
            <ListItem button divider disabled role='listitem'>
              <ListItemText
                primary={module.module_id}
                secondary={module.author}
              />
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div className={classes.root}>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={true}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Search Starred Modules
        </DialogTitle>
        <Paper className={classes.searchPaper}>
          <TextField
            fullWidth
            id='keyword-search-box'
            inputRef={keywordInputRef}
            label='Search By Keywords'
            variant='outlined'
          />
        </Paper>
        <Box>{generateAllStarredList()}</Box>
        <DialogActions>
          <Button
            // autoFocus
            onClick={handleClose}
            color='secondary'
            variant={'outlined'}
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoadMapPopUp;
