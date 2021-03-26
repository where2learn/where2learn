import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Container from '@material-ui/core/Container';
import NavDrawer from '../components/NavDrawer';
import EditModule from '../components/EditModule';
import { addmodule } from '../firebase';

const AddModulePage = () => {
  const { currentUser } = useAuth();

  const submit = (module) => {
    addmodule(currentUser.username, module)
      .then(() => {
        console.log('Successfully Added Module');
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

export default AddModulePage;
