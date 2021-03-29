import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import RoadMapPopUp from '../components/RoadMapPopUp';

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

export default function RmTreeView() {
  // ==== start of return compoenents ===

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    // console.log(e.target.parentNode.className);
    // console.log(e.target.parentNode.parentNode.className);
    if (e.target.parentNode.className === 'editbutton') {
      console.log('hi');
      setOpen(true);
    }

    if (e.target.parentNode.parentNode.className === 'deletebutton') {
      console.log('hi');
    }
  }
  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, ...other } = props;

    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <div className='deletebutton'>
              <DeleteIcon
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

  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };



  const roadmaps = {
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
  };

  // console.log( Object.keys(levelVis).map((key, index) =>
  //       levelVis[key].map((idx) => console.log(key, idx))

  // ))

  const WholeTree = ({ data }) => (
    <React.Fragment>
      {Object.keys(data) &&
        Object.keys(data).map((key, index) => {
          console.log('key', key, 'ata[key]', data[key]);
          return (
            <StyledTreeItem nodeId={key} labelText={key} labelIcon={MailIcon}>
              {data[key] && <WholeTree data={data[key]} />}
            </StyledTreeItem>
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
        <WholeTree data={roadmaps} />
      </TreeView>


      
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
    </div>
  );
}
