import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Container, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
// import NavDrawer from "../components/CustomNavDrawer";
import NavDrawer from "../components/NavDrawer";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../lib/redux_helper";

const getCardMinWidth = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 800) {
    return "100%";
  } else if (windowInnerWidth < 1200) {
    return "50%";
  } else {
    return "40%";
  }
};

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: getCardMinWidth(),
    backgroundColor: theme.palette.background.paper,
    padding: "1em 2em 2em 2em",
  },
  cardaction: {
    justifyContent: "center",
  },
}));

const Dashboard = (props) => {
  const [error, setError] = useState("");
  // const { currentUser, logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = async () => {
    setError("");

    try {
      await props.logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <NavDrawer>
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          pt={"25%"}
          maxHeight="100vh"
          bgcolor="background.default"
        >
          <Card className={classes.card} color="secondary">
            <CardContent>
              <Typography
                variant="h4"
                component="h3"
                style={{ marginBottom: "1em", textAlign: "center" }}
              >
                Profile
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <Typography align="center">
                <strong>Email:</strong> {props.currentUser.email}
              </Typography>
              <br />
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                  history.push("/update-profile");
                }}
              >
                Update Profile
              </Button>
            </CardContent>
            <CardActions classes={{ root: classes.cardaction }}>
              <Box
                display="flex"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="background.paper"
              >
                <Button
                  color="secondary"
                  variant="contained"
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
