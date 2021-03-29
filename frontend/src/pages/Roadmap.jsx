import React, { useState, useEffect } from 'react';
import { Box, Grid, rgbToHex } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavDrawer from '../components/NavDrawer';
import RoadMapPopUp from '../components/RoadMapPopUp';
import { propTypes } from 'react-bootstrap/esm/Image';
import RoadmapTreeView from '../components/RoadmapTreeView';
import RmTreeView from '../components/TreeView';
import Container from '@material-ui/core/Container';
import DisplayModule from '../components/DisplayModule';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Help } from '@material-ui/icons';

// for each individual box, get diff width & margin in diff windowInnerWidth
const getboxWidth = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 800) {
    return 80;
  } else if (windowInnerWidth < 1200) {
    return 120;
  } else {
    return 180;
  }
};

const getboxMargin = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 800) {
    return 10;
  } else if (windowInnerWidth < 1200) {
    return 20;
  } else {
    return 30;
  }
};

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

  hidden_box: {
    backgroundColor: theme.palette.background.default,
  },

  box_group: {
    // bgcolor:"greys",
    display: 'flex',
    flexWrap: 'nowrap',
    // padding: "1px",
    margin: '50px',
    backgroundColor: theme.palette.background.default,
    overflow: 'visible',
    // justifyContent:'center'
    minWidth: '100vw',
    minHeigh: '100vh',
    marginLeft: '10rem',
  },

  single_box: {
    margin: getboxMargin() + 'px',
    textAlign: 'center',
    flexGrow: '0',
    flexShrink: '0',
    width: getboxWidth() + 'px',
    // color: '#424242',
    color: theme.palette.background.default,
  },

  add_button: {
    color: 'rgba(0, 0, 0, 0.54)',
  },

  grid: {
    flexGrow: 1,
  },
}));

const Roadmap = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    console.log(selectedModule);
    // add Children
  }, [selectedModule]);

  //group modules in same level in same array
  //key is level, value is array
  const fullLevelView = (obj, maxLevel, levelArray, level) => {
    level = level || 0;
    levelArray = levelArray || {};

    let total_num = 0;
    for (let key in obj) {
      if (Object.keys(levelArray).length === 0) {
        for (let i = 0; i < maxLevel; i++) {
          levelArray[i] = [];
        }
      }

      if (Object.keys(obj[key]).length === 0) {
        levelArray[level].push([key, 1]);
        for (let i = level + 1; i < maxLevel; i++) {
          levelArray[i].push([null, 1]);
        }
        total_num++;
        continue;
      }
      if (typeof obj[key] == 'object') {
        let num_child = 0;
        [num_child, levelArray] = fullLevelView(
          obj[key],
          maxLevel,
          levelArray,
          level + 1
        );

        levelArray[level].push([key, num_child]);
        total_num += num_child;
      }
    }
    return [total_num, levelArray];
  };

  // add the child to the module id
  const addChild = (obj, parentId, newId) => {
    for (let key in obj) {
      //might need to change if moduleId is string
      if (key === parentId) {
        obj[key][newId] = {};
      }

      if (Object.keys(obj[key]).length === 0) {
        continue;
      }
      if (typeof obj[key] == 'object') {
        addChild(obj[key], parentId, newId);
      }
    }

    return obj;
  };

  //find deepest level
  const findlevel = (obj) => {
    let max_level = 1;
    for (let key in obj) {
      if (Object.keys(obj[key]).length === 0) {
        continue;
      }
      if (typeof obj[key] == 'object') {
        max_level = Math.max(max_level, 1 + findlevel(obj[key]));
      }
    }

    return max_level;
  };

  const classes = useStyles();
  const [roadmapVis, setRoadmapVis] = useState({
    1: {
      2: { 3: {}, 4: {} },
      5: {},
    },
    6: {},
    7: {
      8: {
        9: {},
        10: {
          11: { 12: {}, 13: {} },
        },
      },
    },
  });

  const [totalItems, setTotalItems] = useState(13);
  const [fullLevelVis, setFullLevelVis] = useState(
    fullLevelView(roadmapVis, findlevel(roadmapVis))[1]
  );

  useEffect(() => {
    console.log(props);
  }, []);

  useEffect(() => {
    let level = findlevel(roadmapVis);
    let newLevelView = fullLevelView(roadmapVis, level);
    setFullLevelVis(newLevelView[1]);
    // console.log('fullLevelVis', fullLevelVis);
  }, [roadmapVis, totalItems]);

  function addClick(e) {
    e.preventDefault();
    let clickTarget = e.target;

    while (clickTarget.type !== 'button') {
      clickTarget = clickTarget.parentNode;
    }
    setTotalItems(totalItems + 1);
    let newRoadmapVis = addChild(roadmapVis, clickTarget.id, totalItems);
    setRoadmapVis(newRoadmapVis);

    // console.log('after click, RoadmapVis', roadmapVis);
  }

  // Object.keys(levelVis).map((key, index) =>
  //     levelVis[key].map((idx) => console.log(key, idx))

  // )

  const minwidith = getboxWidth();
  const minMargin = getboxMargin();
  // console.log('minwidith ', minwidith, 'minMargin', minMargin);
  return (
    // <div style={{ width: '100%' }}>
    // <div style={{ minWidth: '100vw', overflow: 'scroll' }}>
    <div style={{ minWidth: '100vw' }}>
      <NavDrawer>
        {/* <RoadmapTreeView /> */}
        <Grid container className={classes.grid} spacing={2}>
          <RmTreeView style={{ float: 'left' }} />

          <div style={{ position: 'absolute', left: '300px' }}>
            <IconButton aria-label='help' onClick={handlePopOver}>
              <Help />
            </IconButton>
            <Popover
              id={Boolean(anchorEl) ? 'simple-popover' : undefined}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handlePopOverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.typography}>
                <DisplayModule />
              </Typography>
            </Popover>
            <React.Fragment>
              {Object.keys(fullLevelVis).map((key, index) => (
                <Box key={index} className={classes.box_group}>
                  {fullLevelVis[key].map((item) => {
                    // console.log('number of child', key, fullLevelVis[key].length);
                    if (item[0] === null) {
                      return (
                        <Box
                          className={[
                            classes.single_box,
                            classes.hidden_box,
                          ].join(' ')}
                          style={{ width: minwidith }}
                          padding={0}
                          margin={minMargin}
                          // bgcolor={'#424242'}
                          zIndex='-999'
                        >
                          {item[0]} numchild: {item[1]}
                        </Box>
                      );
                    } else {
                      return (
                        <Box
                          key={item[0]}
                          className={classes.single_box}
                          style={{
                            width:
                              minwidith +
                              (item[1] - 1) * (minwidith + 2 * minMargin),
                          }}
                          padding={0}
                          margin={minMargin}
                          bgcolor='grey.300'
                        >
                          Module {item[0]} numchild: {item[1]}
                          <Box ml={3}></Box>
                          <IconButton
                            id={item[0]}
                            className={classes.add_button}
                            onClick={handleClickOpen}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Box>
                      );
                    }
                  })}
                </Box>
              ))}
            </React.Fragment>
          </div>
        </Grid>
        {open ? (
          <RoadMapPopUp
            setOpen={setOpen}
            setSelectedModule={setSelectedModule}
            modules={[
              { module_id: 'jiataoxiang', author: 'nobody' },
              { module_id: 'jiatao handsome', author: 'nobody' },
              { module_id: 'hhhhh', author: 'nobody' },
              { module_id: 'Jiat', author: 'nobody' },
              { module_id: 'helyou', author: 'nobody' },
              { module_id: 'hhhhhlo_you', author: 'nobody' },
            ]}
          />
        ) : null}
      </NavDrawer>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap);
