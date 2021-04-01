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
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

import { getModuleComplete } from '../firebase';
import { searchResultLimit } from '../constants';

import '../style/Main.scss';

const useStyles = makeStyles((theme) => ({
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
  tagHintsBG: {
    backgroundColor: theme.palette.bg.l5,
    maxWidth: 500,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.8),
    },
  },
  tagHintChip: {
    backgroundColor: theme.palette.bg.l7,
    color: theme.palette.bg.l1,
  },
}));

const Main = (props) => {
  const [modules, setModules] = useState([]);
  const [roadMaps, setRoadMaps] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageType, setPageType] = useState('modules');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const searchTimeoutRef = useRef(null);
  const [tagInputValue, setTagInputValue] = useState('');
  const tagInputRef = useRef();
  const classes = useStyles();
  const [tagHints, setTagHints] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tagSearchPopperOpen, setTagSearchPopperOpen] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const updateModules = async () => {
    const modules = await getModuleComplete(searchResultLimit, page - 1, tags);
    // setModules(modules);
    setModules(modules.filter((module) => module.roadmap === null));
    setRoadMaps(modules.filter((module) => module.roadmap !== null));
  };

  useEffect(() => {
    tagInputRef.current.addEventListener('focusout', (e) => {
      setTagSearchPopperOpen(false);
    });
    tagInputRef.current.addEventListener('focusin', (e) => {
      handleTagSearchPopper(e);
    });
  }, []);

  useEffect(() => {
    console.log(`page changed: ${page}`);
    updateModules();
  }, [page]);

  useEffect(() => {
    const filteredTags = props.dbTags.filter((tag) =>
      tag.value.toLowerCase().includes(tagInputValue)
    );
    filteredTags.sort((a, b) => b.count - a.count);

    setTagHints(filteredTags);
  }, [tagInputValue]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      console.log(keyword);
      updateModules();
    }, 1000);
  }, [keyword]);

  useEffect(() => {
    if (pageType === 'modules') {
      setSelectedIndex(0);
    } else if (pageType === 'roadmaps') {
      setSelectedIndex(1);
    }
  }, [pageType]);

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
          {/* <div>
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
          </div> */}
        </React.Fragment>
      );
    } else if (pageType === 'roadmaps') {
      return (
        <React.Fragment>
          <ModuleList modules={roadMaps} />
          {/* <Pagination
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

  const handleTagSearchPopper = (event) => {
    setAnchorEl(event.currentTarget);
    setTagSearchPopperOpen((prev) => tagHints && tagHints.length > 0);
  };

  const handleTagSearchOnChange = (e) => {
    setTagInputValue(e.target.value);
    handleTagSearchPopper(e);
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
                    onChange={handleTagSearchOnChange}
                    inputRef={tagInputRef}
                    label='Search By Tags'
                    variant='outlined'
                  />
                </form>
              </Paper>
              {/* <Button onClick={handleClick('bottom-start')}>bottom</Button> */}
              <Popper
                open={tagSearchPopperOpen}
                anchorEl={anchorEl}
                placement='bottom-start'
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper className={classes.tagHintsBG}>
                      {tagHints.map((tag, index) => (
                        <Badge
                          key={index}
                          badgeContent={tag.count}
                          color='primary'
                        >
                          <Chip
                            className={classes.tagHintChip}
                            size='small'
                            label={tag.value}
                            onClick={(e) => {
                              setTags(
                                Array.from(
                                  new Set([tag.value.toLowerCase(), ...tags])
                                )
                              );
                            }}
                          />
                        </Badge>
                      ))}
                    </Paper>
                  </Fade>
                )}
              </Popper>
              {/* <Paper className={classes.searchPaper}>
                <TextField
                  fullWidth
                  id='keyword-search-box'
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  label='Search By Keywords'
                  variant='outlined'
                />
              </Paper> */}
              <Paper className={classes.menuPaper}>
                <List component='nav'>
                  <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={() => setPageType('modules')}
                  >
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary='Modules' />
                  </ListItem>
                  <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={() => setPageType('roadmaps')}
                  >
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
