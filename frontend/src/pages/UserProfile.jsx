import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import NavDrawer from "../components/NavDrawer";
import { Container, Box, TextField, Avatar, Paper, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey, grey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {Settings, Star} from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { Card } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        textAlign: "center",
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    centerImage: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        alignItems: "center",
        
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
}));

const UserProfile = () => {
    const classes = useStyles();
    const [state, setState] = useState("Modules");
    var display = <ListItem> Modules </ListItem>;

    const getCurrentState = () => {
        return <ListItem> {state} </ListItem>
    }

    const toggleState = (e) => {
        e.preventDefault();
        setState(e.target.innerText);
    }

    return (
        <NavDrawer>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={2} style={{marginRight: "80px"}}>
                    <Avatar 
                            variant="square"
                            className={[classes.blueGrey, classes.large, classes.centerImage].join(" ")} 
                        >
                        JT  {/* <img src={process.env.PUBLIC_URL + "/bookmark-solid.png"}/> */}
                        </Avatar>
                        <br/>
                        <br/>
                        <Paper rounded elevation3 className={classes.paper}>
                            <List className={classes.root}>
                                <ListItem button onClick={toggleState}>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Modules"/>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem button onClick={toggleState}>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <Star />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Stars"/>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem button onClick={toggleState}>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <BeachAccessIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Favorite"/>
                                </ListItem>
                            </List>
                        </Paper>
                        <Paper rounded elevation3 className={classes.paper}>
                            <List className={classes.root}>
                                <ListItem button onClick={toggleState}>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <Settings />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Setting"/>
                                </ListItem>
                            </List>
                        </Paper>
                </Grid>
                {/* <Container style={{float: "left", width: "30%", height: "100%"}}></Container>
                <Container className={classes.grey} style={{float: "left", width: "70%", height: "100%"}}></Container> */}
                <Grid item xs={12} sm={12} md={9} lg={7} xl={8} style={{border: "solid"}}>
                    {getCurrentState()}
                </Grid>
            </Grid>
        </NavDrawer>
    )
}

export default UserProfile;