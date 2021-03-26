import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import { useAuth } from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";
import { Container, Box, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavDrawer from "../components/NavDrawer";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../lib/redux_helper";

const getCardMinWidth = () => {
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 800) {
    return "100%";
  } else if (windowInnerWidth < 1200) {
    return "70%";
  } else {
    return "80%";
  }
};

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: getCardMinWidth(),
    backgroundColor: theme.palette.background.paper,
    transform: "translate(0%,-10%)",
    padding: "1em 2em 1em 2em",
  },
  cardaction: {
    justifyContent: "center",
  },
}));

const UpdateProfile = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  function handleSubmit(e) {
    console.log("update profile", props.auth.currentUser);
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    // const promises = [];
    // setLoading(true);
    // setError("");

    // if (emailRef.current.value !== props.auth.currentUser.email) {
    //   promises.push(props.updateEmail(emailRef.current.value));
    // }
    // if (passwordRef.current.value) {
    //   promises.push(props.updatePassword(passwordRef.current.value));
    // }

    // Promise.all(promises)
    //   .then(() => {
    //     history.push("/");
    //   })
    //   .catch(() => {
    //     setError("Failed to update account");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  return (
    <NavDrawer>
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          mt={"25%"}
          alignItems="center"
          maxHeight="100vh"
          bgcolor="background.default"
        >
          <Card className={classes.card}>
            <CardContent>
              <Typography
                variant="h4"
                component="h3"
                style={{ textAlign: "center" }}
              >
                Update Profile
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    fullWidth
                    inputRef={emailRef}
                    margin="normal"
                    label="Email"
                    type="email"
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    margin="normal"
                    inputRef={passwordRef}
                    label="Password"
                    placeholder="Leave blank to keep the same"
                    type="password"
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    margin="normal"
                    inputRef={passwordConfirmRef}
                    label="Password Confirmation"
                    placeholder="Leave blank to keep the same"
                    type="password"
                  />
                </div>
                <br />
                <Button
                  disabled={loading}
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Update
                </Button>
              </Form>
            </CardContent>
            <CardActions classes={{ root: classes.cardaction }}>
              <Link to="/">Cancel</Link>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </NavDrawer>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
