import React, { useEffect, useState, useRef } from 'react';
import NavDrawer from '../components/NavDrawer';
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
import Pagination from '@material-ui/lab/Pagination';

import { getModules, getModuleComplete } from '../firebase';
import { searchResultLimit } from '../constants';

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
  paginationContainer: { display: 'flex', justifyContent: 'center' },
}));

const Main = () => {
  const [modules, setModules] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageType, setPageType] = useState('modules');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const tagTimeoutRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const [tagInputValue, setTagInputValue] = useState('');
  const tagInputRef = useRef();
  const classes = useStyles();

  const updateModules = async () => {
    const modules = await getModuleComplete(searchResultLimit, page - 1, tags);
    setModules(modules);
  };

  useEffect(() => {
    console.log(`page changed: ${page}`);
    updateModules();
  }, [page]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      console.log(keyword);
      updateModules();
    }, 1000);
  }, [keyword]);

  // useEffect(() => {
  //   if (tagTimeoutRef.current) {
  //     clearTimeout(tagTimeoutRef.current);
  //   }
  //   tagTimeoutRef.current = setTimeout(() => {
  //     console.log(tagInputValue);
  //     updateModules();
  //   }, 1000);
  // }, [tagInputValue]);

  useEffect(() => {
    updateModules();
  }, [tags]);

  const handleDeleteTagChip = (tagToDelete) => () => {
    console.log();
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    setTags(
      Array.from(new Set([tagInputRef.current.value.toLowerCase(), ...tags]))
    );
    tagInputRef.current.value = '';
  };

  const getSubPage = () => {
    if (pageType === 'modules') {
      return (
        <React.Fragment>
          <ModuleList modules={modules} />
          <div>
            <Pagination
              className={classes.paginationContainer}
              page={page}
              onChange={(event, newPage) => {
                setPage(newPage);
              }}
              count={10}
              showFirstButton
              showLastButton
            />
          </div>
        </React.Fragment>
      );
    } else if (pageType === 'roadmaps') {
      return (
        <React.Fragment>
          {/* <ModuleList modules={modules} />
          <Pagination
            page={page}
            onChangePage={(event, newPage) => {
              setPage(newPage);
            }}
            count={10}
            showFirstButton
            showLastButton
          /> */}
        </React.Fragment>
      );
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
                    onChange={(e) => {
                      setTagInputValue(e.target.value);
                    }}
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
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  label='Search By Keywords'
                  variant='outlined'
                />
              </Paper>
              <Paper className={classes.menuPaper}>
                <List component='nav'>
                  <ListItem button onClick={() => setPageType('modules')}>
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary='Modules' />
                  </ListItem>
                  <ListItem button onClick={() => setPageType('roadmaps')}>
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
