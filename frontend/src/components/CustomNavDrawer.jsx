import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";

import "../style/CustomNavDrawer.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    height: "100vh",
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: "width 600ms ease",
    overflow: "hidden",
  },
  toggleBtn: {
    marginTop: "auto",
  },
  barBottom: {
    marginTop: "auto",
  },
  drawerOpen: {
    width: "100%",
    marginRight: "2rem",
  },
  drawerClose: {
    width: "3.5rem",
  },
}));

const CustomNavDrawer = (props) => {
  const classes = useStyles();
  return (
    <div className='custom-nav-drawer scrollbar-hidden' square>
      <Paper
        variant='outlined'
        square
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        elevation={0}
      >
        {props.children}
      </Paper>
    </div>
  );
};

const CustomNavDrawerWrapper = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='custom-nav-drawer-wrapper'>
      <CustomNavDrawer open={open}>
        <List>
          <ListItem button key='dashboard'>
            <ListItemIcon>
              <Tooltip title='Dashboard' placement='right'>
                <DashboardIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button key='home'>
            <ListItemIcon>
              <Tooltip title='Home' placement='right'>
                <HomeIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </List>
        <Divider />
        <List style={{ marginTop: "auto" }}>
          <ListItem onClick={() => setOpen(!open)} button key='dashboard'>
            <ListItemIcon>
              <Tooltip title='Toggle Menu' placement='right'>
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </CustomNavDrawer>
      {props.children}
    </div>
  );
};

export default CustomNavDrawerWrapper;
