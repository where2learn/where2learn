import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const { currentUser } = useAuth();
  console.log(authed);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser || authed ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};
export default PrivateRoute;
