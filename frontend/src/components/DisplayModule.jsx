import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EditIcon from '@material-ui/icons/Edit';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import {
  starModule,
  realtimeUpdateModule,
  userHasStarModule,
} from '../firebase';
import { constructFullModuleId, convertTagsObj2Array } from '../firestore_data';

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

const useStyles = makeStyles((theme) => ({
  paperBG: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2rem',
    '& > *': {
      width: '100%',
    },
    '& pre > code': {
      color: theme.palette.text.primary,
    },
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },
  bottomBtn: {
    marginTop: '1rem',
    float: 'right',
  },
  tags: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -10,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const DisplayModule = (props) => {
  const [module, setModule] = useState(null);
  const [fullModuleId, setFullModuleId] = useState('');
  const [tags, setTags] = useState([]);
  const [star, setStar] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  // const { currentUser } = useAuth();

  useEffect(() => {
    const id = constructFullModuleId(
      props.match.params.username,
      props.match.params.module_id
    );
    const unsubscribe = realtimeUpdateModule(id, setModule);
    return unsubscribe;
  }, [props.match.params.username, props.match.params.module_id]);

  useEffect(() => {
    setFullModuleId(
      constructFullModuleId(
        props.match.params.username,
        props.match.params.module_id
      )
    );

    (async () => {
      if (module) {
        setStar(await userHasStarModule(module.author, fullModuleId));
      }
    })();
    // update tags
    if (module) {
      setTags(convertTagsObj2Array(module.tags));
    }
  }, [
    module,
    fullModuleId,
    props.match.params.username,
    props.match.params.module_id,
  ]);

  const toggleStar = async (e) => {
    if (module && module.author && fullModuleId) {
      await starModule(module.author, fullModuleId, star);
    }
  };

  return (
    <React.Fragment>
      {module && module ? (
        <React.Fragment>
          <Paper className={classes.paperBG} elevation={3}>
            {module && (
              <Typography variant='h2' gutterBottom>
                {module && module.title}
              </Typography>
            )}
            <div className={classes.tags}>
              {tags.map((tag, index) => {
                return <Chip key={index} label={tag} />;
              })}
            </div>

            <Breadcrumbs className={classes.breadcrumbs}>
              <Typography color='textPrimary' className={classes.link}>
                <AccountCircleIcon
                  style={{ marginTop: '1.5px' }}
                  className={classes.icon}
                />
                {module && module.author ? module.author : '<username>'}
              </Typography>
              <Typography color='textPrimary' className={classes.link}>
                {module && module.module_id ? module.module_id : '<module id>'}
              </Typography>
            </Breadcrumbs>

            <Typography component='strong' color='textPrimary'>
              {module && module.description
                ? module.description
                : 'No Description'}
            </Typography>
            <div
              style={{ marginTop: '3rem' }}
              dangerouslySetInnerHTML={{
                __html: module && module.content ? module.content : '',
              }}
            />
          </Paper>
          <div className={classes.bottomBtn}>
            {props.auth &&
              props.auth.user &&
              props.auth.user.username === module.author && (
                <IconButton
                  onClick={() => {
                    const url = `/module/edit/${props.match.params.username}/${props.match.params.module_id}`;
                    history.push(url);
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}

            <IconButton onClick={toggleStar}>
              <StyledBadge
                showZero
                badgeContent={module && module.num_star ? module.num_star : 0}
                color='primary'
                max={999}
              >
                {star ? <StarIcon /> : <StarBorderIcon />}
              </StyledBadge>
            </IconButton>
          </div>
        </React.Fragment>
      ) : (
        <h1>404 Module Not Found</h1>
      )}
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayModule));
