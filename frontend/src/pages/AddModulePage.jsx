import React from 'react';
import Container from '@material-ui/core/Container';
import NavDrawer from '../components/NavDrawer';
import EditModule from '../components/EditModule';
import { addModule } from '../firebase';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';

const AddModulePage = (props) => {
  const history = useHistory();
  const submit = (module) => {
    addModule(props.auth.user.username, module)
      .then(() => {
        console.log('Successfully Added Module');
        history.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <NavDrawer>
      <Container maxWidth='md'>
        <EditModule title='Add A Module' mode='add' onSubmit={submit} />
      </Container>
    </NavDrawer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModulePage);
