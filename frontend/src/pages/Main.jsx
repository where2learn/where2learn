import React, { useEffect, useState, useRef } from 'react';
import NavDrawer from '../components/NavDrawer';
import { getModules } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ModuleList from '../components/ModuleList';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import '../style/Main.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tagPaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
  },
  searchPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  menuPaper: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  menuBar: {
    position: 'sticky',
    top: '20px',
    marginTop: '1rem',
  },
}));

const Main = () => {
  const [modules, setModules] = useState([]);
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState('modules');
  const [keyword, setKeyword] = useState('');
  const [searchTimeout, setSearchtimeOut] = useState(null);
  const searchTimeoutRef = useRef(null);
  const tagInputRef = useRef();
  const classes = useStyles();

  const initAllModules = async () => {
    setModules(await getModules());
  };

  useEffect(() => {
    initAllModules();
    tagInputRef.current.onChange = (e) => {
      console.log(e.target);
    };
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      console.log(keyword);
    }, 1000);
  }, [keyword]);

  const handleDeleteTagChip = (tagToDelete) => () => {
    console.log();
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    setTags(Array.from(new Set([tagInputRef.current.value, ...tags])));
    tagInputRef.current.value = '';
  };

  const getSubPage = () => {
    if (page === 'modules') {
      return <ModuleList modules={modules} />;
    } else if (page === 'roadmaps') {
      return <ModuleList modules={modules} />;
    } else {
      return null;
    }
  };

  return (
    <NavDrawer>
      <div className='main-page'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
            <div className={classes.menuBar}>
              {tags && tags.length !== 0 && (
                <Paper className={classes.tagPaper}>
                  {tags.map((tag, index) => {
                    return (
                      <Chip
                        key={index}
                        label={tag}
                        className={classes.chip}
                        onDelete={handleDeleteTagChip(tag)}
                      />
                    );
                  })}
                </Paper>
              )}
              <Paper className={classes.searchPaper}>
                <form onSubmit={handleTagSubmit}>
                  <TextField
                    fullWidth
                    id='tag-search-box'
                    inputRef={tagInputRef}
                    label='Search By Tags'
                    variant='outlined'
                  />
                </form>
              </Paper>
              <Paper className={classes.searchPaper}>
                <TextField
                  fullWidth
                  id='keyword-search-box'
                  onChange={(e) => setKeyword(e.target.value)}
                  label='Search By Keywords'
                  variant='outlined'
                />
              </Paper>
              <Paper className={classes.menuPaper}>
                <List component='nav'>
                  <ListItem button onClick={() => setPage('modules')}>
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary='Modules' />
                  </ListItem>
                  <ListItem button onClick={() => setPage('roadmaps')}>
                    <ListItemIcon>
                      <AccountTreeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Roadmaps' />
                  </ListItem>
                </List>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
            {getSubPage()}
          </Grid>
        </Grid>
      </div>
    </NavDrawer>
  );
};

export default Main;
