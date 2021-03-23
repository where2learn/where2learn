import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getModuleById } from '../firebase';
import Container from '@material-ui/core/Container';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Badge from '@material-ui/core/Badge';

import hljs from 'highlight.js';

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
  starBtn: {
    marginTop: '1rem',
    float: 'right',
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
  const [star, setStar] = useState(false);
  const classes = useStyles();
  useEffect(async () => {
    console.log(props.match.params.id);
    const data = await getModuleById(props.match.params.id);
    setModule(data);
    console.log(data);
  }, []);

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', (event) => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    });
  }, []);

  const toggleStar = (e) => {
    setStar(!star);
  };

  return (
    <React.Fragment>
      {module !== null && module.content ? (
        <React.Fragment>
          <Paper className={classes.paperBG} elevation={3}>
            {module && (
              <Typography variant='h2' gutterBottom>
                {module && module.title}
              </Typography>
            )}
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

            <div
              dangerouslySetInnerHTML={{
                __html: module && module.content ? module.content : '',
              }}
            />
          </Paper>
          <IconButton className={classes.starBtn} onClick={toggleStar}>
            <StyledBadge
              showZero
              badgeContent={
                module && module.num_star ? module.num_star + star : 0
              }
              color='primary'
              max={999}
            >
              {star ? <StarIcon /> : <StarBorderIcon />}
            </StyledBadge>
          </IconButton>
        </React.Fragment>
      ) : (
        <h1>404 Module Not Found</h1>
      )}
    </React.Fragment>
  );
};

export default withRouter(DisplayModule);