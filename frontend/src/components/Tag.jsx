import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Tag = (props) => {
  const useStyles = makeStyles((theme) => ({
    tag: {
      backgroundColor: props.bgcolor ? props.bgcolor : 'rgba(71, 250, 0, 0.2)',
      color: props.color ? props.color : 'rgb(0, 255, 21)',
      fontSize: props.fontSize ? props.fontSize : '12px',
      borderRadius: props.borderRadius ? props.borderRadius : '5px',
      padding: props.padding ? props.padding : '0px 5px 3px 5px',
      border: props.border ? props.border : '1px solid rgba(0, 255, 21, 0.4)',
      ...props.extraStyle,
    },
  }));
  const classes = useStyles();
  return <span className={classes.tag}>{props.content}</span>;
};

export default Tag;
