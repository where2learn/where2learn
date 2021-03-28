import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import StarIcon from '@material-ui/icons/Star';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

import { convertTagsObj2Array } from '../firestore_data';
import { previewMaxTags } from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  cardContent: {
    minHeight: 120,
  },
  media: {
    height: 140,
  },
  badge: {
    top: 13,
  },
  starBtn: {
    color: theme.palette.text.primary,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
    },
  },
  tags: {
    marginTop: -10,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const ModulePreview = (props) => {
  const classes = useStyles();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (props.tags) {
      setTags(convertTagsObj2Array(props.tags));
    }
  }, [props.tags]);

  return (
    <Card
      onClick={props.onClick}
      className={`module-preview-component ${classes.root}`}
    >
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link className={classes.link} to={props.title_link}>
            {props.title}
          </Link>
        }
        subheader={props.subheader}
      />
      <Divider />
      <CardContent className={classes.cardContent}>
        <div className={classes.tags}>
          {tags.slice(0, previewMaxTags).map((tag, index) => {
            return <Chip size='small' key={index} label={tag} />;
          })}
        </div>
        <Typography
          // noWrap={true}
          variant='body2'
          color='textSecondary'
          component='p'
        >
          {props.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <IconButton disabled={true} aria-label='cart'>
          <Badge
            showZero
            badgeContent={props.num_star}
            color='primary'
            max={999}
          >
            <StarIcon className={classes.starBtn} />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ModulePreview;
