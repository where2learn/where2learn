import React from 'react';
import Container from '@material-ui/core/Container';
import NavDrawer from '../components/NavDrawer';
import EditModule from '../components/EditModule';
import { addmodule } from '../firebase';

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

const AddModulePage = (props) => {
  // const { currentUser } = useAuth();

  const submit = (module) => {
    addmodule(props.auth.user.username, module)
      .then(() => {
        console.log('Successfully Added Module');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <NavDrawer>
      <Container maxWidth="md">
        <EditModule title="Add A Module" mode="add" onSubmit={submit} />
      </Container>
    </NavDrawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModulePage);
