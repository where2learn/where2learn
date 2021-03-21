import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import NavDrawer from "../components/NavDrawer";
import { Box, Avatar, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey, grey } from "@material-ui/core/colors";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Settings, StarHalf, CreditCard } from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import { getUserInfo, getModulesByUsername, getStarModules } from "../firebase";
import ModuleList from "../components/ModuleList";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "left",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  centerImage: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
    fontSize: 20,
  },
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[700]),
    backgroundColor: blueGrey[700],
  },
  grey: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  info: {
    marginRight: "30px",
    marginLeft: "10px",
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const [state, setState] = useState("Modules");
  //   const [avatar, setAvatar] = useState();
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState({ username: "User" });
  const [modules, setModules] = useState([]);
  const [stars, setStars] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const textField = document.getElementById("name");
    setUserInfo({
      ...userInfo,
      avatar: textField.value,
    });
    console.log(textField.value);
    setOpen(false);
  };

  useEffect(() => {
    getUserInfo(currentUser.uid).then((user) => {
      setUserInfo(user);
    });
    getModulesByUsername(currentUser.username).then((modules) => {
      setModules(modules);
      // setStars(stars);
    });
    getStarModules(currentUser.username).then((modules) => {
      setStars(modules);
    });
  }, []);

  const getCurrentState = () => {
    // console.log(userInfo);
    if (state === "Modules") {
      return <ModuleList modules={modules} />;
    } else if (state === "Stars") {
      return <ModuleList modules={stars} />;
    }
    return <ListItem> {state} </ListItem>;
  };

  const toggleState = (e) => {
    e.preventDefault();
    setState(e.target.innerText);
  };

  return (
    <NavDrawer>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={2}
          style={{ marginRight: "100px" }}
        >
          <Avatar
            variant="square"
            className={[
              classes.blueGrey,
              classes.large,
              classes.centerImage,
            ].join(" ")}
            onMouseEnter={() => {
              const avatar = document.getElementById("avatar");
              if (avatar) {
                avatar.style.opacity = 0.5;
              }
            }}
            onMouseLeave={() => {
              const avatar = document.getElementById("avatar");
              if (avatar) {
                avatar.style.opacity = 1;
              }
            }}
            onClick={handleClickOpen}
          >
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                id="avatar"
              />
            ) : (
              "JT"
            )}
          </Avatar>
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Change Your Avatar</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please make sure your avatar link is accessible
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Avatar Resource:"
                fullWidth
                color="primary"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Save</Button>
            </DialogActions>
          </Dialog>
          <br />
          <br />
          <Paper rounded="true" elevation3="true" className={classes.paper}>
            <Box
              component="span"
              display="block"
              className={classes.centerText}
            >
              {userInfo.username}
            </Box>
            <br />
            <List className={classes.root}>
              <ListItem button onClick={toggleState}>
                <ListItemAvatar>
                  <Avatar>
                    <Settings />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Setting" />
              </ListItem>
            </List>
            <br />
            <Box component="div">
              <Box component="span" className={classes.info}>
                <StarHalf /> 200
              </Box>
              <Box component="span" className={classes.info}>
                <CreditCard /> {userInfo.credit}
              </Box>
            </Box>
          </Paper>
          <Paper rounded="true" elevation3="true" className={classes.paper}>
            <List className={classes.root}>
              <ListItem button onClick={toggleState}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Modules" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem button onClick={toggleState}>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Stars" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem button onClick={toggleState}>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Favorite" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        {/* <Container style={{float: "left", width: "30%", height: "100%"}}></Container>
                <Container className={classes.grey} style={{float: "left", width: "70%", height: "100%"}}></Container> */}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={7}
          xl={8}
          style={{ border: "solid" }}
        >
          {getCurrentState()}
        </Grid>
      </Grid>
    </NavDrawer>
  );
};

export default UserProfile;
