import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoadMapPopUp from '../components/RoadMapPopUp';
import Button from '@material-ui/core/Button';
import RoadMapDeletePOPUP from '../components/RoadMapDeletePopUp';

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
    paddingRight: "240px",
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
const TreeViewDisplay = (props) => {
  // ==== start of return compoenents ===

  const classes = useStyles();
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [choseModule, setChoseModule] = useState(null);

  const [mode, setMode] = useState(null)
  const [child, setChild] = useState(null)
  const [parent, setParent] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(true)
  //dummy variable nee
  const [totalItems, setTotalItems] = useState(13)

  //TODO: needs to be deleted
//   const [roadmap, setRoadmap] = useState({
//     1: {
//       2: { 3: {}, 4: {} },
//       5: {},
//     },
//     6: {},
//     7: {
//       8: {
//         9: {},
//         10: {
//           11: { 12: {}, 13: {} },
//         },
//       },
//     },
//   });

const [roadmap, setRoadmap] = useState({});

useEffect(() => {
    let new_roadmap = props.roadmapVis;
    
    setRoadmap(new_roadmap);

}, [props.roadmapVis]);

  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { id, labelText, labelIcon: LabelIcon, labelInfo, ...other } = props;

    return (
      <TreeItem
        id={id}
        label={
          <div className={classes.labelRoot}>

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
      {data && Object.keys(data) &&
        Object.keys(data).map((key, index) => {
          return (
            // <div id={key}>
            <StyledTreeItem
              nodeId={key}
              id={key}
              labelText={key}
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
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: '1000px' }} />}
      >
        <WholeTree data={roadmap} />
      </TreeView>
    </div>
  );
}

export default TreeViewDisplay;