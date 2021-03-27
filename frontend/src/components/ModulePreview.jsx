import React from 'react';
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
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    width: 345,
    // height: 245,
    backgroundColor: theme.palette.background.paper,
  },
  cardContent: {
    height: 100,
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
}));

const ModulePreview = (props) => {
  const classes = useStyles();

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
      <CardContent className={classes.cardContent}>
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
