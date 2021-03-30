import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoadMapPopUp from '../components/RoadMapPopUp';
import Button from '@material-ui/core/Button';

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
    paddingRight: theme.spacing(1),
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
export default function RmTreeView() {
  // ==== start of return compoenents ===

  const classes = useStyles();
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [deletOpen, setDeleteOpen] = useState(false);
  const [choseModule, setChoseModule] = useState(null);

  const [mode, setMode] = useState(null);
  const [child, setChild] = useState(null);
  const [parent, setParent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  //TODO: needs to be deleted
  const [roadmap, setRoadmap] = useState({
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

  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };

  // console.log( Object.keys(levelVis).map((key, index) =>
  //       levelVis[key].map((idx) => console.log(key, idx))

  // ))

  // add the child to the module id
  const changeChild = (obj, parentId, newId, mode) => {
    for (let key in obj) {
      //might need to change if moduleId is string
      if (key === parentId) {
        if (mode === 'add') {
          obj[key][newId] = {};
        } else if (mode === 'edit') {
          let cp_module = JSON.parse(JSON.stringify(obj[parentId][newId]));
          delete obj[parentId][newId];
          obj[choseModule] = cp_module;
        } else {
          delete obj[parentId][newId];
        }
      }

      if (Object.keys(obj[key]).length === 0) {
        continue;
      }
      if (typeof obj[key] == 'object') {
        changeChild(obj[key], parentId, newId, mode);
      }
    }

    return obj;
  };

  //Todo: finish the delete child
  const deleteChild = () => {
    //if it is root node
    if (parent == null) {
      delete roadmap[child];
    } else {
      //when delete, get its parent, and itself
      setRoadmap(changeChild(roadmap, parent, child, 'delete'));
    }
  };

  //TODO: finish the delete child
  //check deleteconfirm set to false in pop ups?
  useEffect(() => {
    if (deleteConfirm) {
      deleteChild();
      setDeleteConfirm(false);
    }
  }, [deleteConfirm]);

  useEffect(() => {
    console.log(choseModule);
    // add Children
    if (mode === 'add') {
      if (parent == null) {
        roadmap[choseModule] = {};
        setRoadmap(roadmap);
      } else {
        setRoadmap(changeChild(roadmap, child, choseModule, 'add'));
      }
    }
    if (mode === 'edit') {
      if (parent == null) {
        let cp_module = JSON.parse(JSON.stringify(roadmap[child]));
        delete roadmap[child];
        roadmap[choseModule] = cp_module;
        setRoadmap(roadmap);
      } else {
        setRoadmap(changeChild(roadmap, parent, child, 'edit'));
      }
    }
  }, [choseModule]);

  //TODO: start module, go to pop up window: add one to the roadmaps

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
      // console.log("parent", parent)
      setParent(null);
    } else {
      parent = child.parentNode;
      while (!parent.id) {
        parent = parent.parentNode;
      }
      // console.log("findParent", parent.id)
      setParent(parent.id);
    }

    // parent = child
  }

  function addRoot(e) {
    e.preventDefault();
    setAddEditOpen(true);
  }

  //TODO: child, parent, mode
  function handleClick(e) {
    e.preventDefault();
    // console.log("e.target.parentNode", e.target.parentNode);
    console.log(
      'e.target.parentNode.parentNode)',
      e.target.parentNode.parentNode.className
    );
    // console.log("6 item", e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
    // console.log("id6",e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    if (
      e.target.parentNode.className === 'editbutton' ||
      e.target.parentNode.parentNode.className === 'editbutton'
    ) {
      setMode('edit');
      // console.log("edit");
      setAddEditOpen(true);
    }

    if (
      e.target.parentNode.parentNode.className === 'deletebutton' ||
      e.target.parentNode.parentNode.className === 'deletebutton'
    ) {
      // console.log('delete');

      setMode('delete');
      setDeleteOpen(true);
    }

    if (
      e.target.parentNode.parentNode.className === 'addbutton' ||
      e.target.parentNode.parentNode.className === 'addbutton'
    ) {
      setMode('add');
      setAddEditOpen(true);
      // console.log('add');
    }

    findIds(e);

    // console.log("e.target.parentNode.parentNode.className === 'deletebutton'", e.target.parentNode.parentNode.className === 'deletebutton')
    // console.log("e.target.parentNode.parentNode.className === 'addbutton'", e.target.parentNode.parentNode.className === 'addbutton')
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

  const WholeTree = ({ data }) => (
    <React.Fragment>
      {Object.keys(data) &&
        Object.keys(data).map((key, index) => {
          // console.log('key', key, 'ata[key]', data[key]);
          return (
            // <div id={key}>
            <StyledTreeItem
              nodeId={key}
              id={key}
              labelText={key}
              labelIcon={MailIcon}
            >
              {data[key] && <WholeTree data={data[key]} />}
            </StyledTreeItem>
            // </div>
          );
        })}
    </React.Fragment>
  );

  return (
    <div className={classes.viewBar}>
      <Button variant='contained' color='primary' onClick={handleClick}>
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
        />
      ) : null}
    </div>
  );
}
