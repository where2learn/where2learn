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
  const [editOpen, setEditOpen] = useState(false);
  const [deletOpen, setDeleteOpen] = useState(false);
  const [choseModule, setChoseModule] = useState(null);

  const [mode, setMode] = useState(null)
  const [child, setChild] = useState(null)
  const [parent, setParent] = useState(null)
  


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

  useEffect(() => {
    console.log(choseModule);
    // add Children
  }, [choseModule]);

  //TODO: start module, go to pop up window: add one to the roadmaps


  function findIds(e){
    const check = ['editbutton', 'deletebutton', 'addbutton'];
    let snode = null;
    let child = null;
    let parent = null;
    if (check.includes(e.target.parentNode.className)){
        snode = e.target.parentNode.parentNode.nodeId;
    }

    if (check.includes(e.target.parentNode.parentNode.className)){
      snode = e.target.parentNode.parentNode.parentNode.nodeId;
  }

  }

  //TODO: child, parent, mode
  function handleClick(e) {
    e.preventDefault();
    console.log("e.target.parentNode", e.target.parentNode);
    console.log("e.target.parentNode.parentNode)",e.target.parentNode.parentNode);
    console.log("6 item", e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
    console.log("id6",e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    if (
      e.target.parentNode.className ||
      e.target.parentNode.parentNode.className === 'editbutton'
    ) {
      setMode("edit")
      console.log(e.target);
      setEditOpen(true);
    }

    if (
      e.target.parentNode.parentNode.className ||
      e.target.parentNode.parentNode.className === 'deletebutton'
    ) {
      setMode("delete")
      console.log('hi');
    }

    if (
      e.target.parentNode.parentNode.className ||
      e.target.parentNode.parentNode.className === 'addbutton'
    ) {
      setMode("add")
      console.log('hi');
    }

  }

  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { id, labelText, labelIcon: LabelIcon, labelInfo, ...other } = props;

    return (
      <TreeItem
        id = {id}
        label={
          <div className={classes.labelRoot}>
            <div className='deletebutton'>
              <DeleteRoundedIcon
                color='inherit'
                className={classes.labelIcon}
                variant='contained'
              />
            </div>
            <div className='editbutton'>
              <EditRoundedIcon
                color='inherit'
                className={classes.labelIcon}
                variant='contained'
                // onClick={handleClick}
              />
            </div>
            <div className='addbutton'>
              <AddCircleIcon 
                color='inherit'
                className={classes.labelIcon}
                variant='contained'
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
        onLabelClick={handleClick}
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
            <StyledTreeItem nodeId={key} id={key} labelText={key} labelIcon={MailIcon}>
              {data[key] && <WholeTree data={data[key]} />}
            </StyledTreeItem>
            // </div>
          );
        })}
    </React.Fragment>
  );

  return (
    <div className={classes.viewBar}>
      <Button variant="contained" color="primary">
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

      {/* {editOpen ? (
        <RoadMapPopUp
          setOpen={setEditOpen}
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
      ) : null} */}
    </div>
  );
}
