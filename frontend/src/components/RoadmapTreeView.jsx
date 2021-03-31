import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import DisplayModule from '../components/DisplayModule';


const useStyles = makeStyles({
  treegroup: {
    height: 216,
    flexGrow: 1
    
  },
  viewBar: {
    position: 'sticky',
    top: '150px',
    left: '55px',
    marginTop: '1rem',
    marginRight: '1rem',
    width: '180px',
    backgroundColor: "grey",
    zIndex: "999",
  },
});

export default function RoadmapTreeView() {
  const classes = useStyles();

  return (
    <div className={classes.viewBar} style={{bgcolor:"red"}}>
        <TreeView
        className={classes.treegroup}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        
        >
        <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
            <TreeItem nodeId="3" label="Chrome" />
            <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
                <TreeItem nodeId="8" label="index.js" />
                <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
            </TreeItem>
        </TreeItem>
        </TreeView>
    </div>
  );
}