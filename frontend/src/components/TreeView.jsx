import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoadMapPopUp from '../components/RoadMapPopUp';
import Button from '@material-ui/core/Button';
import RoadMapDeletePOPUP from '../components/RoadMapDeletePopUp';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    // position: 'sticky',
    top: '150px',
    left: '200px',
    marginTop: '1rem',
    marginRight: '100rem',
    maxwidth: '100%',
    fontSize: '0.1rem',
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: '750px',
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
    '&:active': {
      textDecoration: 'none',
      color: 'red',
    },
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  viewBar: {
    position: 'sticky',
    top: '150px',
    left: '55px',
    marginTop: '1rem',
    marginRight: '1rem',
    width: '180px',
    backgroundColor: 'grey',
    zIndex: '999',
    float: 'left',
    maxWidth: '400px',
  },
}));

const useStyles = makeStyles({
  root: {
    minheight: '100vh',
    flexGrow: 1,
    maxWidth: 300,
  },
});

// start of return module
const RmTreeView = (props) => {
  // ==== start of return compoenents ===

  const classes = useStyles();
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [choseModule, setChoseModule] = useState(null);

  const [mode, setMode] = useState(null);
  const [child, setChild] = useState(null);
  const [parent, setParent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);


  //TODO: needs to be deleted
  // const [roadmap, setRoadmap] = useState({
  //   1: {
  //     2: { 3: {}, 4: {} },
  //     5: {},
  //   },
  //   6: {},
  //   7: {
  //     8: {
  //       9: {},
  //       10: {
  //         11: { 12: {}, 13: {} },
  //       },
  //     },
  //   },
  // });
  const [roadmap, setRoadmap] = useState(props.roadmap);

  useEffect(() => {
    props.setRoadMap(roadmap);
  }, [roadmap]);

  //useeffect for detele; comment it out if you don't want to use deletepopup window
  useEffect(() => {
    if (deleteConfirm) {
      if (parent == null) {
        delete roadmap[child];
      } else {
        //when delete, get its parent, and itself
        console.log('');
        let newRoadmapVis = changeChild(roadmap, parent, child, 'delete');
        setRoadmap(newRoadmapVis);
      }
      setDeleteConfirm(false);
    }
  }, [deleteConfirm]);

  //useeffect for add and edit
  useEffect(() => {
    console.log('useeffect for choseModule');
    console.log(choseModule);
    // add Children
    if (choseModule) {
      if (mode === 'add') {
        console.log('mode === add');
        console.log('child, choseModule', child, choseModule);
        let newroadmap = changeChild(roadmap, child, choseModule, 'add');
        setRoadmap(newroadmap);
      } else if (mode === 'addroot') {
        roadmap[choseModule] = {};
        setRoadmap(roadmap);
      } else if (mode === 'edit') {
        if (parent == null) {
          let cp_module = JSON.parse(JSON.stringify(roadmap[child]));
          delete roadmap[child];
          roadmap[choseModule] = cp_module;
          setRoadmap(roadmap);
        } else {
          let newroadmap = changeChild(roadmap, parent, child, 'edit');
          setRoadmap(newroadmap);
        }
      }
      setChoseModule(null);
    }
  }, [choseModule]);

  const changeChild = (obj, parentId, childId, mode) => {
    for (let key in obj) {
      //might need to change if moduleId is string
      if (key === parentId) {
        if (mode === 'add') {
          obj[key][childId] = {};
        } else if (mode === 'edit') {
          console.log('parentId, childId', parentId, childId);
          console.log('obj', obj[parentId]);
          let cp_module = JSON.parse(JSON.stringify(obj[parentId][childId]));
          delete obj[parentId][childId];
          obj[parentId][choseModule] = cp_module;
        } else {
          delete obj[parentId][childId];
        }
      }

      if (Object.keys(obj[key]).length === 0) {
        continue;
      }
      if (typeof obj[key] == 'object') {
        changeChild(obj[key], parentId, childId, mode);
      }
    }

    return obj;
  };

  function findIds(e) {
    const check = ['editbutton', 'deletebutton', 'addbutton'];
    let child = e.target.parentNode;
    let parent = null;

    while (!check.includes(child.className)) {
      child = child.parentNode;
    }

    while (!child.id) {
      child = child.parentNode;
    }

    setChild(child.id);
    // console.log("child.id in roadmap", child.id in roadmap)
    // console.log("findId", child.id)
    if (child.id in roadmap) {
      parent = null;

      setParent(null);
    } else {
      parent = child.parentNode;
      while (!parent.id) {
        parent = parent.parentNode;
      }
      setParent(parent.id);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (
      e.target.id === 'addrootbutton' ||
      e.target.parentNode.id === 'addrootbutton'
    ) {
      setMode('addroot');
      console.log('addroot');
      setAddEditOpen(true);
    } else {
      if (
        e.target.parentNode.className === 'editbutton' ||
        e.target.parentNode.parentNode.className === 'editbutton'
      ) {
        console.log('edit button');
        setMode('edit');
        setAddEditOpen(true);
      } else if (
        e.target.parentNode.className === 'deletebutton' ||
        e.target.parentNode.parentNode.className === 'deletebutton'
      ) {
        setMode('delete');
        setDeleteOpen(true);
      } else if (
        e.target.parentNode.className === 'addbutton' ||
        e.target.parentNode.parentNode.className === 'addbutton'
      ) {
        setMode('add');
        setAddEditOpen(true);
        // console.log('add');
      }
      findIds(e);
    }

    //dummy
    // setTotalItems(totalItems + 1);
    // setChoseModule(totalItems);
  }

  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { id, labelText, labelIcon: LabelIcon, labelInfo, ...other } = props;

    return (
      <TreeItem
        id={id}
        label={
          <div className={classes.labelRoot}>
            <div className='deletebutton'>
              <DeleteRoundedIcon
                color='inherit'
                className={classes.labelIcon}
                variant='contained'
                onClick={handleClick}
              />
            </div>
            <div className='editbutton'>
              <EditRoundedIcon
                color='inherit'
                className={classes.labelIcon}
                variant='contained'
                onClick={handleClick}
              />
            </div>
            <div className='addbutton'>
              <AddCircleIcon
                color='inherit'
                className={classes.labelIcon}
                variant='contained'
                onClick={handleClick}
                // onClick={handleClick}
              />
            </div>

            <Typography variant='body2' className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant='caption' color='inherit'>
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          '--tree-view-color': '#a250f5',
          // "--tree-view-bg-color": bgColor
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
        // onLabelClick={handleClick}
      />
    );
  }

  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };

  const WholeTree = ({ data }) => (
    <React.Fragment>
      {/* {console.log("newest roadmap", data)} */}
      {Object.keys(data) &&
        Object.keys(data).map((key, index) => {
          return (
            // <div id={key}>
            <StyledTreeItem nodeId={key} id={key} labelText={key.split("\\")[1] + " author:" + key.split("\\")[0] }>
              {data[key] && <WholeTree data={data[key]} />}
            </StyledTreeItem>
            // </div>
          );
        })}
    </React.Fragment>
  );

  return (
    <div className={classes.viewBar}>
      <Button
        variant='contained'
        id='addrootbutton'
        color='primary'
        onClick={handleClick}
      >
        Add start module
      </Button>
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: '1000px' }} />}
      >
        <WholeTree data={roadmap} />
      </TreeView>

      {addEditOpen ? (
        <RoadMapPopUp
          setOpen={setAddEditOpen}
          setSelectedModule={setChoseModule}
          modules={[
            { module_id: 'jiataoxiang', author: 'nobody' },
            { module_id: 'jiatao handsome', author: 'nobody' },
            { module_id: 'hhhhh', author: 'nobody' },
            { module_id: 'Jiat', author: 'nobody' },
            { module_id: 'helyou', author: 'nobody' },
            { module_id: 'hhhhhlo_you', author: 'nobody' },
          ]}
          // mode={mode}
        />
      ) : null}

      {/* remember to pass in module */}
      {deleteOpen ? (
        <RoadMapDeletePOPUP
          setDeleteOpen={setDeleteOpen}
          setDeleteConfirm={setDeleteConfirm}
        />
      ) : null} 
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RmTreeView);