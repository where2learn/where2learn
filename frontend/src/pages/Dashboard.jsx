import React, { useState } from "react";
// import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Container, Box, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import NavDrawer from "../components/NavDrawer";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    transform: "translate(0%,-10%)",
    padding: "1em 2em 1em 2em",
  },
  cardaction: {
    justifyContent: "center",
  },
}));

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <NavDrawer>
      <Container maxWidth='sm'>
        <Box
          display='flex'
          justifyContent='center'
          mt={"25%"}
          maxHeight='100vh'
          bgcolor='background.default'
        >
          <Card className={classes.card} color='secondary'>
            <CardContent>
              <Typography
                variant='h4'
                component='h3'
                style={{ marginBottom: "1em", textAlign: "center" }}
              >
                Profile
              </Typography>
              {error && <Alert severity='error'>{error}</Alert>}
              <Typography align='center'>
                <strong>Email:</strong> {currentUser.email}
              </Typography>
              <br />
              <Button
                fullWidth
                color='primary'
                variant='contained'
                onClick={() => {
                  history.push("/update-profile");
                }}
              >
                Update Profile
              </Button>
            </CardContent>
            <CardActions classes={{ root: classes.cardaction }}>
              <Box
                display='flex'
                justifyContent='center'
                m={1}
                p={1}
                bgcolor='background.paper'
              >
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </NavDrawer>
  );
};
export default Dashboard;
