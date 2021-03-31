import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const PrivateRoute = ({ component: Component, auth, path, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();

  const whereToGo = (props_) => {
    if (auth && auth.user && auth.currentUser) {
      if (auth.currentUser.uid === auth.user.username || !auth.user.username) {
        if (path === '/set-username') {
          return <Component {...props_} />;
        } else {
          return <Redirect to='/set-username' />;
        }
      } else {
        return <Component {...props_} />;
      }
    } else {
      enqueueSnackbar('Not Authenticated', { variant: 'error' });
      return <Redirect to='/login' />;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return whereToGo(props);
      }}
    ></Route>
  );
};
export default PrivateRoute;
